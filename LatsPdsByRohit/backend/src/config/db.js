const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    logger.info('database_connected');
  } catch (error) {
    logger.error('database_connection_failed', {
      message: error.message,
    });
    process.exit(1);
  }
};

module.exports = connectDB;
