const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');
const { getAdminAnalytics } = require('../controllers/adminController');

router.get('/analytics', protect, admin, getAdminAnalytics);

module.exports = router;
