const Grievance = require('../models/Grievance');

async function getGrievances() {
  return Grievance.find({}).populate('user', 'name');
}

async function createGrievance(userId, data) {
  const { subject, description } = data;

  const grievance = new Grievance({
    user: userId,
    subject,
    description,
  });

  return grievance.save();
}

async function getMyGrievances(userId) {
  return Grievance.find({ user: userId });
}

module.exports = {
  getGrievances,
  createGrievance,
  getMyGrievances,
};
