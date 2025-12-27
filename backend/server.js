const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Drug = require('./models/Drug');
require('dotenv').config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

if (process.env.NODE_ENV === 'production' && process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Drug Repurposer Backend OK', timestamp: new Date().toISOString() });
});

// Basic DB test route (remove later)
app.get('/test-db', async (req, res) => {
  try {
    const count = await Drug.countDocuments();
    res.json({ dbConnected: true, drugCount: count });
  } catch (err) {
    console.error('Database test error:', err);
    res.status(500).json({ error: 'DB test failed' });
  }
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/drug-repurposer';

if (!process.env.MONGO_URI) {
  console.warn('⚠️ Using default MongoDB URI. Set MONGO_URI environment variable for production.');
}

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
