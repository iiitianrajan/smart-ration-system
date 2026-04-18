const express = require('express');
const router = express.Router();
const {
  getAllocations,
  getMyAllocations,
  createAllocation,
} = require('../controllers/allocationController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(getAllocations).post(protect, admin, createAllocation);
router.route('/my').get(protect, getMyAllocations);

module.exports = router;
