const adminAnalyticsService = require('../services/adminAnalyticsService');

// @desc    Get admin analytics dashboard data
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getAdminAnalytics = async (req, res) => {
  try {
    const analytics = await adminAnalyticsService.getAdminAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(error.statusCode || 500);
    throw error;
  }
};

module.exports = {
  getAdminAnalytics,
};
