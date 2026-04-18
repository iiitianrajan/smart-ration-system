const asyncHandler = require('express-async-handler');
const Allocation = require('../models/Allocation');
const User = require('../models/User');
const { getStoredRoles } = require('../utils/roles');

// @desc    Get all allocations
// @route   GET /api/allocations
// @access  Public (or Admin ideally)
const getAllocations = asyncHandler(async (req, res) => {
  const allocations = await Allocation.find({}).populate('user', 'name rationCardNumber');
  res.json(allocations);
});

// @desc    Get logged in user allocations
// @route   GET /api/allocations/my
// @access  Private
const getMyAllocations = asyncHandler(async (req, res) => {
  const allocations = await Allocation.find({ user: req.user._id });
  res.json(allocations);
});

// @desc    Create a new allocation
// @route   POST /api/allocations
// @access  Private/Admin
const createAllocation = asyncHandler(async (req, res) => {
  const { userId, itemType, totalQuantity, monthYear } = req.body;

  if (!userId || !itemType || !monthYear) {
    res.status(400);
    throw new Error('User, item type, and month are required');
  }

  const quantity = Number(totalQuantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    res.status(400);
    throw new Error('Please provide a valid total quantity');
  }

  const beneficiary = await User.findOne({
    _id: userId,
    role: { $in: getStoredRoles('user') },
  });

  if (!beneficiary) {
    res.status(404);
    throw new Error('Selected user was not found');
  }

  const allocation = await Allocation.create({
    user: beneficiary._id,
    itemType,
    quantity,
    monthYear,
  });

  const populatedAllocation = await Allocation.findById(allocation._id)
    .populate('user', 'name rationCardNumber phone');

  res.status(201).json(populatedAllocation);
});

module.exports = {
  getAllocations,
  getMyAllocations,
  createAllocation,
};
