const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const env = require('./config/env');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');
const { authRateLimiter } = require('./middlewares/rateLimitMiddleware');
const logger = require('./utils/logger');

// Connect to database
connectDB();

const app = express();
const allowedOrigins = (env.FRONTEND_URL || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin not allowed by CORS'));
  },
  credentials: true,
};

// Middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
  referrerPolicy: { policy: 'no-referrer' },
}));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRateLimiter, require('./routes/userRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/allocations', require('./routes/allocationRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/shops', require('./routes/shopRoutes'));
app.use('/api/grievances', require('./routes/grievanceRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('Smart Ration API is running...');
});

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = env.PORT;

app.listen(PORT, () => {
  logger.info('server_started', {
    port: PORT,
    environment: env.NODE_ENV,
  });
});
