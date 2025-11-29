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

// CORS: allow only the exact CLIENT_URL and enable credentials
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, Postman)
    if (!origin) return callback(null, true);
    if (origin === CLIENT_URL) return callback(null, true);
    return callback(new Error('CORS: Not allowed by CORS'), false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // enable preflight for all routes

// Basic health check / root message
app.get('/health', (req, res) => res.json({ ok: true }));
app.get('/', (req, res) => res.json({ message: 'Backend up. Use /api/* endpoints.' }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Generic error handler (CORS errors from origin callback will surface here)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && (err.stack || err.message) || err);
  if (err && err.message && err.message.startsWith('CORS')) {
    return res.status(403).json({ message: err.message });
  }
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (NODE_ENV=${process.env.NODE_ENV || 'development'})`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.info('SIGTERM received — shutting down gracefully');
  server.close(() => {
    console.info('HTTP server closed');
    process.exit(0);
  });
  setTimeout(() => {
    console.error('Forcing shutdown after 10s');
    process.exit(1);
  }, 10000);
});

module.exports = app;
