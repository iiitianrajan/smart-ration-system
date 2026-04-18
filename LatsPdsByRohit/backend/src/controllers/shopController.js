const Shop = require('../models/Shop');
const User = require('../models/User');
const { isDealerRole } = require('../utils/roles');
const auditService = require('../services/auditService');

// @desc    Get all shops
// @route   GET /api/shops
// @access  Public
const getShops = async (req, res) => {
  const shops = await Shop.find({}).populate('dealerId', 'name phone role');
  res.json(shops);
};

// @desc    Assign a dealer to a shop
// @route   PUT /api/shops/:id/assign-dealer
// @access  Private/Admin
const assignDealerToShop = async (req, res) => {
  const { dealerId } = req.body;

  if (!dealerId) {
    res.status(400);
    throw new Error('Dealer ID is required');
  }

  const shop = await Shop.findById(req.params.id);

  if (!shop) {
    res.status(404);
    throw new Error('Shop not found');
  }

  const dealer = await User.findById(dealerId);

  if (!dealer) {
    res.status(404);
    throw new Error('Dealer not found');
  }

  if (!isDealerRole(dealer.role)) {
    res.status(400);
    throw new Error('Selected user is not a valid dealer');
  }

  const existingAssignment = await Shop.findOne({
    dealerId: dealer._id,
    _id: { $ne: shop._id },
  });

  if (existingAssignment) {
    res.status(400);
    throw new Error('Dealer is already assigned to another shop');
  }

  shop.dealerId = dealer._id;
  await shop.save();

  const updatedShop = await Shop.findById(shop._id).populate('dealerId', 'name phone role');
  auditService.logAction({
    user: req.user,
    action: 'ASSIGN_DEALER',
    metadata: {
      shopId: updatedShop._id,
      shopCode: updatedShop.shopId,
      dealerId: dealer._id,
    },
    req,
  });

  res.json(updatedShop);
};

module.exports = {
  getShops,
  assignDealerToShop,
};
