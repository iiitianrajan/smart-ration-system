const asyncHandler = require('express-async-handler');
const Grievance = require('../models/Grievance');

// @desc    Get all grievances (for admin)
// @route   GET /api/grievances
// @access  Private/Admin
const getGrievances = asyncHandler(async (req, res) => {
  const grievances = await Grievance.find({}).populate('user', 'name');
  res.json(grievances);
});

// @desc    Create a grievance
// @route   POST /api/grievances
// @access  Private
const createGrievance = asyncHandler(async (req, res) => {
  const { subject, description } = req.body;

  const grievance = new Grievance({
    user: req.user._id,
    subject,
    description,
  });

  const createdGrievance = await grievance.save();
  res.status(201).json(createdGrievance);
});

// @desc    Get logged in user grievances
// @route   GET /api/grievances/my
// @access  Private
const getMyGrievances = asyncHandler(async (req, res) => {
  const grievances = await Grievance.find({ user: req.user._id });
  res.json(grievances);
});

module.exports = {
  getGrievances,
  createGrievance,
  getMyGrievances,
};
