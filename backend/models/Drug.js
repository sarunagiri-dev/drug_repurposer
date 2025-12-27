// backend/models/Drug.js
const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  disease: { type: String, required: true, index: true },
  sourceId: String,
  confidence: { type: Number, default: 0.0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Drug', drugSchema);
