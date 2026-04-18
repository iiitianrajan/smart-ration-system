const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  refreshToken,
  logoutUser,
  getUserProfile,
  getCustomers,
} = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} = require('../validators/userValidators');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), authUser);
router.post('/refresh-token', validate(refreshTokenSchema), refreshToken);
router.post('/logout', validate(refreshTokenSchema), logoutUser);
router.get('/profile', protect, getUserProfile);
router.get('/customers', protect, getCustomers);

module.exports = router;
