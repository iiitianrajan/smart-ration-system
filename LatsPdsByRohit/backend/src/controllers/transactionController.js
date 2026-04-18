const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const Shop = require('../models/Shop');
const { isDealerRole } = require('../utils/roles');

// @desc    Get all transactions (public ledger)
// @route   GET /api/transactions
// @access  Public
const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({})
    .populate('user', 'name aadharNumber')
    .populate('shop', 'name location');
  res.json(transactions);
});

// @desc    Get logged in user transactions
// @route   GET /api/transactions/my
// @access  Private
const getMyTransactions = asyncHandler(async (req, res) => {
  let query = { user: req.user._id };

  if (isDealerRole(req.user.role)) {
    const dealerShop = await Shop.findOne({ dealerId: req.user._id }).select('_id');

    if (!dealerShop) {
      return res.json([]);
    }

    query = { shop: dealerShop._id };
  }

  const transactions = await Transaction.find(query)
    .populate('shop', 'name location shopId')
    .populate('user', 'name phone rationCardNumber');
  res.json(transactions);
});

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private/Dealer
const createTransaction = asyncHandler(async (req, res) => {
  if (!isDealerRole(req.user.role)) {
    res.status(403);
    throw new Error('Only dealers can create transactions');
  }

  const { userId, itemsCollected } = req.body;

  if (!userId) {
    res.status(400);
    throw new Error('User is required');
  }

  if (!Array.isArray(itemsCollected) || !itemsCollected.length) {
    res.status(400);
    throw new Error('At least one collected item is required');
  }

  const normalizedItems = itemsCollected
    .map((item) => ({
      itemType: String(item.itemType || '').trim(),
      quantity: Number(item.quantity),
    }))
    .filter((item) => item.itemType && Number.isFinite(item.quantity) && item.quantity > 0);

  if (!normalizedItems.length) {
    res.status(400);
    throw new Error('Please provide a valid item and quantity');
  }

  const beneficiary = await User.findById(userId);

  if (!beneficiary) {
    res.status(404);
    throw new Error('Selected user was not found');
  }

  const dealerShop = await Shop.findOne({ dealerId: req.user._id }).select('_id name location shopId');

  if (!dealerShop) {
    res.status(400);
    throw new Error('Dealer shop not found. Please link a shop before creating transactions.');
  }

  const transaction = await Transaction.create({
    user: beneficiary._id,
    shop: dealerShop._id,
    itemsCollected: normalizedItems,
    receiptId: `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
  });

  const populatedTransaction = await Transaction.findById(transaction._id)
    .populate('user', 'name phone rationCardNumber')
    .populate('shop', 'name location shopId');

  res.status(201).json(populatedTransaction);
});

module.exports = {
  getTransactions,
  getMyTransactions,
  createTransaction,
};
