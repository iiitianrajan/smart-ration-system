const grievanceService = require('../services/grievanceService');
const auditService = require('../services/auditService');

// @desc    Get all grievances (for admin)
// @route   GET /api/grievances
// @access  Private/Admin
const getGrievances = async (req, res) => {
  try {
    const grievances = await grievanceService.getGrievances();
    res.json(grievances);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Create a grievance
// @route   POST /api/grievances
// @access  Private
const createGrievance = async (req, res) => {
  try {
    const grievance = await grievanceService.createGrievance(req.user._id, req.body);
    auditService.logAction({
      user: req.user,
      action: 'CREATE_COMPLAINT',
      metadata: {
        grievanceId: grievance._id,
        subject: grievance.subject,
        status: grievance.status,
      },
      req,
    });
    res.status(201).json(grievance);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

// @desc    Get logged in user grievances
// @route   GET /api/grievances/my
// @access  Private
const getMyGrievances = async (req, res) => {
  try {
    const grievances = await grievanceService.getMyGrievances(req.user._id);
    res.json(grievances);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

module.exports = {
  getGrievances,
  createGrievance,
  getMyGrievances,
};
