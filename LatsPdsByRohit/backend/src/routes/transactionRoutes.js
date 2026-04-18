const express = require('express');
const router = express.Router();
const {
  getTransactions,
  getMyTransactions,
  createTransaction,
} = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const { createTransactionSchema } = require('../validators/transactionValidators');

router.route('/').get(protect, getTransactions).post(protect, validate(createTransactionSchema), createTransaction);
router.route('/my').get(protect, getMyTransactions);

module.exports = router;
