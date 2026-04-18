const mongoose = require('mongoose');

const shopSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shopId: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    dealerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      required: true,
      enum: ['Active', 'Inactive'],
      default: 'Active',
    },
    inventory: [
      {
        itemType: String,
        availableQuantity: Number,
      }
    ]
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
