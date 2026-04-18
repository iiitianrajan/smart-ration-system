const allocationService = require('../services/allocationService');
const auditService = require('../services/auditService');

// @desc    Get all allocations
// @route   GET /api/allocations
// @access  Private
const getAllocations = async (req, res) => {
  try {
    const allocations = await allocationService.getAllocations(req.user);
    res.json(allocations);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Get logged in user allocations
// @route   GET /api/allocations/my
// @access  Private
const getMyAllocations = async (req, res) => {
  try {
    const allocations = await allocationService.getMyAllocations(req.user._id);
    res.json(allocations);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Create a new allocation
// @route   POST /api/allocations
// @access  Private/Admin
const createAllocation = async (req, res) => {
  try {
    const allocation = await allocationService.createAllocation(req.body);
    auditService.logAction({
      user: req.user,
      action: 'CREATE_ALLOCATION',
      metadata: {
        allocationId: allocation._id,
        beneficiaryId: allocation.user?._id || req.body.userId,
        itemType: allocation.itemType,
        totalQuantity: allocation.totalQuantity ?? allocation.quantity,
        monthYear: allocation.monthYear,
      },
      req,
    });
    res.status(201).json(allocation);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

module.exports = {
  getAllocations,
  getMyAllocations,
  createAllocation,
};
