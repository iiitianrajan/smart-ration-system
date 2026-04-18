const Allocation = require('../models/Allocation');
const User = require('../models/User');
const { getStoredRoles, isAdminRole } = require('../utils/roles');
const { createHttpError } = require('./serviceUtils');

async function getAllocations(requestUser) {
  const query = isAdminRole(requestUser.role) ? {} : { user: requestUser._id };
  return Allocation.find(query).populate('user', 'name rationCardNumber');
}

async function getMyAllocations(userId) {
  return Allocation.find({ user: userId });
}

async function createAllocation(data) {
  const { userId, itemType, totalQuantity, monthYear } = data;

  if (!userId || !itemType || !monthYear) {
    throw createHttpError(400, 'User, item type, and month are required');
  }

  const quantity = Number(totalQuantity);

  if (!Number.isFinite(quantity) || quantity <= 0) {
    throw createHttpError(400, 'Please provide a valid total quantity');
  }

  const beneficiary = await User.findOne({
    _id: userId,
    role: { $in: getStoredRoles('user') },
  });

  if (!beneficiary) {
    throw createHttpError(404, 'Selected user was not found');
  }

  const allocation = await Allocation.create({
    user: beneficiary._id,
    itemType,
    quantity,
    totalQuantity: quantity,
    monthYear,
  });

  return Allocation.findById(allocation._id)
    .populate('user', 'name rationCardNumber phone');
}

module.exports = {
  getAllocations,
  getMyAllocations,
  createAllocation,
};
