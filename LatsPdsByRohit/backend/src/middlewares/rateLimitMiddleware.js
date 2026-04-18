const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: 'Too many authentication requests. Please try again in a minute.',
  },
});

module.exports = {
  authRateLimiter,
};
