const express = require('express');
const router = express.Router();
const {
  getAllocations,
  getMyAllocations,
  createAllocation,
} = require('../controllers/allocationController');
const { protect, admin } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const { createAllocationSchema } = require('../validators/allocationValidators');

router.route('/').get(protect, getAllocations).post(protect, admin, validate(createAllocationSchema), createAllocation);
router.route('/my').get(protect, getMyAllocations);

module.exports = router;
