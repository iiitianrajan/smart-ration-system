const express = require('express');
const router = express.Router();
const { getGrievances, createGrievance, getMyGrievances } = require('../controllers/grievanceController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(protect, admin, getGrievances).post(protect, createGrievance);
router.route('/my').get(protect, getMyGrievances);

module.exports = router;
