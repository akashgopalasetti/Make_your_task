// backend/server.js
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// If running behind a proxy (Render, Heroku), trust proxy so secure cookies work
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Middlewares
app.use(express.json());
app.use(cookieParser());

// CORS - allow your frontend origin and credentials
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Basic health check
app.get('/health', (req, res) => res.json({ ok: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Generic error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack || err);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`));

// Graceful shutdown for production platforms
process.on('SIGTERM', () => {
  console.info('SIGTERM received — shutting down gracefully');
  server.close(() => {
    console.info('HTTP server closed');
    // Optionally close DB connection here if you have a reference
    process.exit(0);
  });

  // Force exit after 10s
  setTimeout(() => {
    console.error('Forcing shutdown after 10s');
    process.exit(1);
  }, 10000);
});

module.exports = app;
