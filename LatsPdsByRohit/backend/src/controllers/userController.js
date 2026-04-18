const userService = require('../services/userService');
const auditService = require('../services/auditService');

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  try {
    const user = await userService.authenticateUser(req.body);
    auditService.logAction({
      user,
      action: 'LOGIN',
      metadata: {
        phone: user.phone,
      },
      req,
    });
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh-token
// @access  Public
const refreshToken = async (req, res) => {
  try {
    const authPayload = await userService.refreshUserToken(req.body);
    res.json(authPayload);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = async (req, res) => {
  try {
    const result = await userService.logoutUser(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user._id);
    res.json(user);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Get eligible users for dealer transactions
// @route   GET /api/users/customers
// @access  Private/Dealer
const getCustomers = async (req, res) => {
  try {
    const customers = await userService.getCustomers(req.user);
    res.json(customers);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

module.exports = {
  registerUser,
  authUser,
  refreshToken,
  logoutUser,
  getUserProfile,
  getCustomers,
};
