const dotenv = require('dotenv');

dotenv.config();

const requiredVariables = ['JWT_SECRET', 'REFRESH_TOKEN_SECRET', 'MONGO_URI', 'FRONTEND_URL'];

const missingVariables = requiredVariables.filter((variableName) => {
  return !process.env[variableName] || !String(process.env[variableName]).trim();
});

if (missingVariables.length) {
  const missingSummary = missingVariables.join(', ');
  throw new Error(`Missing required environment variables: ${missingSummary}`);
}

module.exports = {
  PORT: Number(process.env.PORT) || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  FRONTEND_URL: process.env.FRONTEND_URL,
};
