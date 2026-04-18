const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashRefreshToken,
  getRefreshTokenExpiryDate,
} = require('../utils/generateToken');
const {
  normalizeRole,
  isAdminRole,
  isDealerRole,
  getStoredRoles,
} = require('../utils/roles');
const logger = require('../utils/logger');
const { createHttpError } = require('./serviceUtils');

function canManageTransactions(role) {
  return isAdminRole(role) || isDealerRole(role);
}

function mapDuplicateUserError(error) {
  if (error?.code !== 11000 || !error?.keyPattern) {
    return null;
  }

  if (error.keyPattern.phone) {
    return createHttpError(400, 'Phone number is already registered');
  }

  if (error.keyPattern.aadharNumber) {
    return createHttpError(400, 'Aadhar number is already registered');
  }

  if (error.keyPattern.rationCardNumber) {
    return createHttpError(400, 'Ration card number is already registered');
  }

  return createHttpError(400, 'User already exists');
}

async function persistRefreshToken(user, refreshToken) {
  const refreshTokenHash = hashRefreshToken(refreshToken);
  const refreshTokenExpiresAt = getRefreshTokenExpiryDate();

  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        refreshTokenHash,
        refreshTokenExpiresAt,
      },
    },
  );

  user.refreshTokenHash = refreshTokenHash;
  user.refreshTokenExpiresAt = refreshTokenExpiresAt;
}

async function clearRefreshToken(user) {
  await User.updateOne(
    { _id: user._id },
    {
      $set: {
        refreshTokenHash: null,
        refreshTokenExpiresAt: null,
      },
    },
  );

  user.refreshTokenHash = null;
  user.refreshTokenExpiresAt = null;
}

function buildAuthPayload(user, refreshToken) {
  const accessToken = generateAccessToken(user._id);
  const payload = {
    _id: user._id,
    name: user.name,
    phone: user.phone,
    role: normalizeRole(user.role),
    token: accessToken,
    accessToken,
  };

  if (refreshToken) {
    payload.refreshToken = refreshToken;
  }

  return payload;
}

async function registerUser(data) {
  const { name, phone, password, rationCardNumber, aadharNumber } = data;

  const userExists = await User.findOne({ phone });

  if (userExists) {
    throw createHttpError(400, 'User already exists');
  }

  let user;

  try {
    user = await User.create({
      name,
      phone,
      password,
      role: 'user',
      rationCardNumber,
      aadharNumber,
    });
  } catch (error) {
    const duplicateError = mapDuplicateUserError(error);

    if (duplicateError) {
      throw duplicateError;
    }

    throw error;
  }

  if (!user) {
    throw createHttpError(400, 'Invalid user data');
  }

  const refreshToken = generateRefreshToken(user._id);
  await persistRefreshToken(user, refreshToken);

  return buildAuthPayload(user, refreshToken);
}

async function authenticateUser(data) {
  const { phone, password } = data;
  const user = await User.findOne({ phone });

  if (!user || !(await user.matchPassword(password))) {
    throw createHttpError(401, 'Invalid phone or password');
  }

  const refreshToken = generateRefreshToken(user._id);
  await persistRefreshToken(user, refreshToken);

  logger.info('user_logged_in', {
    userId: String(user._id),
    role: normalizeRole(user.role),
  });

  return buildAuthPayload(user, refreshToken);
}

async function getUserProfile(userId) {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return {
    _id: user._id,
    name: user.name,
    phone: user.phone,
    role: normalizeRole(user.role),
    rationCardNumber: user.rationCardNumber,
    aadharNumber: user.aadharNumber,
  };
}

async function getCustomers(requestUser) {
  if (!canManageTransactions(requestUser.role)) {
    throw createHttpError(403, 'Only dealers can access customer records');
  }

  return User.find({ role: { $in: getStoredRoles('user') } })
    .select('_id name phone rationCardNumber')
    .sort({ name: 1 });
}

async function refreshUserToken(data) {
  const { refreshToken } = data;

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw createHttpError(401, 'Invalid or expired refresh token');
  }

  if (decoded.type !== 'refresh') {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const user = await User.findById(decoded.id);

  if (!user || !user.refreshTokenHash || !user.refreshTokenExpiresAt) {
    throw createHttpError(401, 'Refresh token is not recognized');
  }

  if (user.refreshTokenExpiresAt.getTime() <= Date.now()) {
    await clearRefreshToken(user);
    throw createHttpError(401, 'Refresh token has expired');
  }

  const incomingHash = hashRefreshToken(refreshToken);

  if (incomingHash !== user.refreshTokenHash) {
    await clearRefreshToken(user);
    throw createHttpError(401, 'Refresh token reuse detected');
  }

  const nextRefreshToken = generateRefreshToken(user._id);
  await persistRefreshToken(user, nextRefreshToken);

  logger.info('access_token_refreshed', {
    userId: String(user._id),
    role: normalizeRole(user.role),
  });

  return buildAuthPayload(user, nextRefreshToken);
}

async function logoutUser(data) {
  const { refreshToken } = data;

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw createHttpError(401, 'Invalid or expired refresh token');
  }

  if (decoded.type !== 'refresh') {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const user = await User.findById(decoded.id);

  if (!user || !user.refreshTokenHash) {
    throw createHttpError(401, 'Refresh token is not recognized');
  }

  const incomingHash = hashRefreshToken(refreshToken);

  if (incomingHash !== user.refreshTokenHash) {
    throw createHttpError(401, 'Refresh token is not recognized');
  }

  await clearRefreshToken(user);

  logger.info('user_logged_out', {
    userId: String(user._id),
    role: normalizeRole(user.role),
  });

  return {
    message: 'Logged out successfully',
  };
}

module.exports = {
  registerUser,
  authenticateUser,
  getUserProfile,
  getCustomers,
  refreshUserToken,
  logoutUser,
};
