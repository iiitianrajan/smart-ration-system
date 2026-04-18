const express = require('express');
const router = express.Router();
const { getGrievances, createGrievance, getMyGrievances } = require('../controllers/grievanceController');
const { protect, admin } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const { createGrievanceSchema } = require('../validators/grievanceValidators');

router.route('/').get(protect, admin, getGrievances).post(protect, validate(createGrievanceSchema), createGrievance);
router.route('/my').get(protect, getMyGrievances);

module.exports = router;
