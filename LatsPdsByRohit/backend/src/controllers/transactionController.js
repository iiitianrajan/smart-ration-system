const transactionService = require('../services/transactionService');
const auditService = require('../services/auditService');

// @desc    Get all transactions (public ledger)
// @route   GET /api/transactions
// @access  Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getTransactions(req.user);
    res.json(transactions);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Get logged in user transactions
// @route   GET /api/transactions/my
// @access  Private
const getMyTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getMyTransactions(req.user);
    res.json(transactions);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Create a new transaction
// @route   POST /api/transactions
// @access  Private/Dealer
const createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.createTransaction(req.user, req.body);
    auditService.logAction({
      user: req.user,
      action: 'CREATE_TRANSACTION',
      metadata: {
        transactionId: transaction._id,
        beneficiaryId: transaction.user?._id || req.body.userId,
        shopId: transaction.shop?._id,
        itemsCollected: transaction.itemsCollected,
      },
      req,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

module.exports = {
  getTransactions,
  getMyTransactions,
  createTransaction,
};
