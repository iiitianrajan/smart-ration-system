const mongoose = require('mongoose');

const allocationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    itemType: {
      type: String,
      required: true,
      enum: ['Wheat', 'Rice', 'Sugar', 'Kerosene'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    monthYear: {
      type: String, // e.g. "Oct 2026"
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'Collected'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Allocation = mongoose.model('Allocation', allocationSchema);

module.exports = Allocation;
