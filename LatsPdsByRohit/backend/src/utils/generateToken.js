const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

function generateAccessToken(id) {
  return jwt.sign({ id, type: 'access' }, env.JWT_SECRET, {
    expiresIn: '15m',
  });
}

function generateRefreshToken(id) {
  return jwt.sign({ id, type: 'refresh' }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: '7d',
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
}

function hashRefreshToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function getRefreshTokenExpiryDate() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return expiry;
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  hashRefreshToken,
  getRefreshTokenExpiryDate,
};
