const express = require('express');
const router = express.Router();
const { getShops, assignDealerToShop } = require('../controllers/shopController');
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').get(getShops);
router.route('/:id/assign-dealer').put(protect, admin, assignDealerToShop);

module.exports = router;
