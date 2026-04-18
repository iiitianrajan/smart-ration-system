const Allocation = require('../models/Allocation');
const Transaction = require('../models/Transaction');
const Grievance = require('../models/Grievance');
const User = require('../models/User');
const Shop = require('../models/Shop');

async function getSummaryCounts() {
  const [totalAllocations, totalTransactions, totalComplaints, activeUsers] = await Promise.all([
    Allocation.countDocuments(),
    Transaction.countDocuments(),
    Grievance.countDocuments(),
    User.countDocuments({ role: 'user' }),
  ]);

  return {
    totalAllocations,
    totalTransactions,
    totalComplaints,
    activeUsers,
  };
}

async function getFastQuotaClaims() {
  const fullyClaimedAllocations = await Allocation.find({
    $or: [{ status: 'Collected' }, { quantity: 0 }],
  })
    .populate('user', 'name phone')
    .sort({ updatedAt: -1 })
    .limit(50)
    .lean();

  return fullyClaimedAllocations
    .map((allocation) => {
      const totalQuantity = allocation.totalQuantity ?? allocation.quantity ?? 0;
      const claimedWithinMs = new Date(allocation.updatedAt).getTime() - new Date(allocation.createdAt).getTime();

      return {
        userId: allocation.user?._id,
        userName: allocation.user?.name || 'Unknown user',
        phone: allocation.user?.phone || 'N/A',
        itemType: allocation.itemType,
        totalQuantity,
        claimedWithinHours: Number((claimedWithinMs / (1000 * 60 * 60)).toFixed(1)),
        monthYear: allocation.monthYear,
      };
    })
    .filter((entry) => entry.totalQuantity > 0 && entry.claimedWithinHours <= 24)
    .slice(0, 6);
}

async function getHighDealerActivity() {
  const transactionCounts = await Transaction.aggregate([
    {
      $group: {
        _id: '$shop',
        transactionCount: { $sum: 1 },
        lastTransactionAt: { $max: '$transactionDate' },
      },
    },
    { $sort: { transactionCount: -1 } },
  ]);

  if (!transactionCounts.length) {
    return [];
  }

  const averageCount =
    transactionCounts.reduce((sum, entry) => sum + entry.transactionCount, 0) / transactionCounts.length;
  const threshold = Math.max(5, Math.ceil(averageCount * 1.5));
  const flaggedShops = transactionCounts.filter((entry) => entry.transactionCount >= threshold);

  if (!flaggedShops.length) {
    return [];
  }

  const shops = await Shop.find({
    _id: { $in: flaggedShops.map((entry) => entry._id) },
  })
    .populate('dealerId', 'name phone')
    .lean();

  const shopMap = new Map(shops.map((shop) => [String(shop._id), shop]));

  return flaggedShops.slice(0, 6).map((entry) => {
    const shop = shopMap.get(String(entry._id));

    return {
      shopId: entry._id,
      shopName: shop?.name || 'Unknown shop',
      dealerName: shop?.dealerId?.name || 'Unassigned dealer',
      dealerPhone: shop?.dealerId?.phone || 'N/A',
      transactionCount: entry.transactionCount,
      lastTransactionAt: entry.lastTransactionAt,
    };
  });
}

async function getRepeatedTransactions() {
  const recentTransactions = await Transaction.find()
    .sort({ transactionDate: -1 })
    .populate('user', 'name phone')
    .populate('shop', 'name')
    .limit(200)
    .lean();

  const repeatedPairs = [];

  for (let index = 0; index < recentTransactions.length - 1; index += 1) {
    const current = recentTransactions[index];
    const previous = recentTransactions[index + 1];

    if (!current.user?._id || !previous.user?._id || !current.shop?._id || !previous.shop?._id) {
      continue;
    }

    const sameUser = String(current.user._id) === String(previous.user._id);
    const sameShop = String(current.shop._id) === String(previous.shop._id);

    if (!sameUser || !sameShop) {
      continue;
    }

    const differenceMs =
      new Date(current.transactionDate).getTime() - new Date(previous.transactionDate).getTime();
    const differenceMinutes = Math.abs(differenceMs) / (1000 * 60);

    if (differenceMinutes <= 15) {
      repeatedPairs.push({
        userId: current.user._id,
        userName: current.user.name || 'Unknown user',
        phone: current.user.phone || 'N/A',
        shopName: current.shop.name || 'Unknown shop',
        currentReceiptId: current.receiptId,
        previousReceiptId: previous.receiptId,
        timeDifferenceMinutes: Number(differenceMinutes.toFixed(1)),
        latestTransactionAt: current.transactionDate,
      });
    }
  }

  return repeatedPairs.slice(0, 6);
}

async function getAdminAnalytics() {
  const [summary, fastQuotaClaims, highDealerActivity, repeatedTransactions] = await Promise.all([
    getSummaryCounts(),
    getFastQuotaClaims(),
    getHighDealerActivity(),
    getRepeatedTransactions(),
  ]);

  return {
    summary,
    fraudIndicators: {
      fastQuotaClaims,
      highDealerActivity,
      repeatedTransactions,
    },
  };
}

module.exports = {
  getAdminAnalytics,
};
