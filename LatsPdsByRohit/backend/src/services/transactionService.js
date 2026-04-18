const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Shop = require('../models/Shop');
const Allocation = require('../models/Allocation');
const { isAdminRole, isDealerRole } = require('../utils/roles');
const logger = require('../utils/logger');
const { createHttpError } = require('./serviceUtils');

function parseMonthYearRange(monthYear) {
  if (/^\d{4}-\d{2}$/.test(monthYear)) {
    const [year, month] = monthYear.split('-').map(Number);
    const periodStart = new Date(Date.UTC(year, month - 1, 1));
    const periodEnd = new Date(Date.UTC(year, month, 1));
    return { periodStart, periodEnd };
  }

  if (/^[A-Z][a-z]{2} \d{4}$/.test(monthYear)) {
    const [monthLabel, yearLabel] = monthYear.split(' ');
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      .indexOf(monthLabel);

    if (monthIndex !== -1) {
      const year = Number(yearLabel);
      const periodStart = new Date(Date.UTC(year, monthIndex, 1));
      const periodEnd = new Date(Date.UTC(year, monthIndex + 1, 1));
      return { periodStart, periodEnd };
    }
  }

  throw createHttpError(400, 'Allocation month format is invalid');
}

async function getClaimedQuantity(userId, itemType, monthYear, session) {
  const { periodStart, periodEnd } = parseMonthYearRange(monthYear);
  const claimed = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
        transactionDate: {
          $gte: periodStart,
          $lt: periodEnd,
        },
      },
    },
    { $unwind: '$itemsCollected' },
    {
      $match: {
        'itemsCollected.itemType': itemType,
      },
    },
    {
      $group: {
        _id: null,
        totalClaimed: { $sum: '$itemsCollected.quantity' },
      },
    },
  ]).session(session);

  return claimed[0]?.totalClaimed || 0;
}

async function getTransactions(requestUser) {
  let query = {};

  if (isDealerRole(requestUser.role)) {
    const dealerShop = await Shop.findOne({ dealerId: requestUser._id }).select('_id');

    if (!dealerShop) {
      return [];
    }

    query = { shop: dealerShop._id };
  } else if (!isAdminRole(requestUser.role)) {
    query = { user: requestUser._id };
  }

  return Transaction.find(query)
    .populate('user', 'name phone rationCardNumber')
    .populate('shop', 'name location');
}

async function getMyTransactions(requestUser) {
  let query = { user: requestUser._id };

  if (isDealerRole(requestUser.role)) {
    const dealerShop = await Shop.findOne({ dealerId: requestUser._id }).select('_id');

    if (!dealerShop) {
      return [];
    }

    query = { shop: dealerShop._id };
  }

  return Transaction.find(query)
    .populate('shop', 'name location shopId')
    .populate('user', 'name phone rationCardNumber');
}

async function createTransaction(requestUser, data) {
  if (!isDealerRole(requestUser.role)) {
    throw createHttpError(403, 'Only dealers can create transactions');
  }

  const { userId, itemsCollected } = data;

  if (!userId) {
    throw createHttpError(400, 'User is required');
  }

  if (!Array.isArray(itemsCollected) || !itemsCollected.length) {
    throw createHttpError(400, 'At least one collected item is required');
  }

  const normalizedItems = itemsCollected
    .map((item) => ({
      itemType: String(item.itemType || '').trim(),
      quantity: Number(item.quantity),
    }))
    .filter((item) => item.itemType && Number.isFinite(item.quantity) && item.quantity > 0);

  if (!normalizedItems.length) {
    throw createHttpError(400, 'Please provide a valid item and quantity');
  }

  const aggregatedItems = Array.from(
    normalizedItems.reduce((itemsMap, item) => {
      const currentQuantity = itemsMap.get(item.itemType) || 0;
      itemsMap.set(item.itemType, currentQuantity + item.quantity);
      return itemsMap;
    }, new Map()).entries(),
  ).map(([itemType, quantity]) => ({ itemType, quantity }));

  const session = await mongoose.startSession();
  let createdTransactionId = null;

  try {
    await session.withTransaction(async () => {
      const beneficiary = await User.findById(userId).session(session);

      if (!beneficiary) {
        throw createHttpError(404, 'Selected user was not found');
      }

      const dealerShop = await Shop.findOne({ dealerId: requestUser._id })
        .select('_id name location shopId')
        .session(session);

      if (!dealerShop) {
        throw createHttpError(400, 'Dealer shop not found. Please link a shop before creating transactions.');
      }

      for (const item of aggregatedItems) {
        const allocation = await Allocation.findOne({
          user: beneficiary._id,
          itemType: item.itemType,
          status: { $ne: 'Collected' },
        })
          .sort({ createdAt: -1 })
          .session(session);

        if (!allocation) {
          throw createHttpError(400, `No active allocation found for ${item.itemType}`);
        }

        const totalAllocated = allocation.totalQuantity ?? allocation.quantity;
        const totalClaimed = await getClaimedQuantity(beneficiary._id, item.itemType, allocation.monthYear, session);
        const remainingQuota = totalAllocated - totalClaimed;

        if (item.quantity > remainingQuota) {
          throw createHttpError(400, `${item.itemType} quantity exceeds remaining quota`);
        }

        const nextRemaining = remainingQuota - item.quantity;
        allocation.totalQuantity = totalAllocated;
        allocation.quantity = nextRemaining;
        allocation.status = nextRemaining <= 0 ? 'Collected' : 'Pending';
        await allocation.save({ session });
      }

      const transaction = await Transaction.create([{
        user: beneficiary._id,
        shop: dealerShop._id,
        itemsCollected: aggregatedItems,
        receiptId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      }], { session });

      createdTransactionId = transaction[0]._id;
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }

    throw error;
  } finally {
    await session.endSession();
  }

  return Transaction.findById(createdTransactionId)
    .populate('user', 'name phone rationCardNumber')
    .populate('shop', 'name location shopId')
    .then((transaction) => {
      logger.info('transaction_created', {
        transactionId: String(transaction._id),
        userId: String(transaction.user._id),
        shopId: String(transaction.shop._id),
      });
      return transaction;
    });
}

module.exports = {
  getTransactions,
  getMyTransactions,
  createTransaction,
};
