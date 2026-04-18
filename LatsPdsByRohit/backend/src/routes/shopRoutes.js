const express = require('express');
const router = express.Router();
const { getShops, assignDealerToShop } = require('../controllers/shopController');
const { protect, admin } = require('../middlewares/authMiddleware');
const validate = require('../validators/validate');
const { assignDealerSchema } = require('../validators/shopValidators');

router.route('/').get(getShops);
router.route('/:id/assign-dealer').put(protect, admin, validate(assignDealerSchema), assignDealerToShop);

module.exports = router;
