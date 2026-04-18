const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { normalizeRole, isAdminRole } = require('../utils/roles');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }

    if (!req.user) {
      res.status(401);
      throw new Error('Not authorized, user not found');
    }

    req.user.role = normalizeRole(req.user.role);
    next();
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

const admin = (req, res, next) => {
  if (req.user && isAdminRole(req.user.role)) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
};

module.exports = { protect, admin };
