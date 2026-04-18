const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getMyTransactions,
  createTransaction,
} = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/').get(getTransactions).post(protect, createTransaction);
router.route('/my').get(protect, getMyTransactions);

module.exports = router;
