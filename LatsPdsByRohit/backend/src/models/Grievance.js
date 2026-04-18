const mongoose = require('mongoose');

const grievanceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
      default: 'Open',
    },
    filedDate: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
);

const Grievance = mongoose.model('Grievance', grievanceSchema);

module.exports = Grievance;
