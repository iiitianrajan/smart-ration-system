const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { normalizeRole } = require('../utils/roles');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rationCardNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    aadharNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokenHash: {
      type: String,
      default: null,
    },
    refreshTokenExpiresAt: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      required: true,
      enum: ['user', 'dealer', 'admin'],
      default: 'user',
      set: normalizeRole,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;
