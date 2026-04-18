const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const {
  normalizeRole,
  isAdminRole,
  isDealerRole,
  getStoredRoles,
} = require('../utils/roles');

function canManageTransactions(role) {
  return isAdminRole(role) || isDealerRole(role);
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, phone, password, role, rationCardNumber, aadharNumber } = req.body;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name,
    phone,
    password,
    role: role || 'user',
    rationCardNumber,
    aadharNumber
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: normalizeRole(user.role),
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findOne({ phone });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: normalizeRole(user.role),
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid phone or password');
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      role: normalizeRole(user.role),
      rationCardNumber: user.rationCardNumber,
      aadharNumber: user.aadharNumber,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get eligible users for dealer transactions
// @route   GET /api/users/customers
// @access  Private/Dealer
const getCustomers = asyncHandler(async (req, res) => {
  if (!canManageTransactions(req.user.role)) {
    res.status(403);
    throw new Error('Only dealers can access customer records');
  }

  const customers = await User.find({ role: { $in: getStoredRoles('user') } })
    .select('_id name phone rationCardNumber')
    .sort({ name: 1 });

  res.json(customers);
});

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  getCustomers,
};
