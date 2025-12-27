// backend/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Drug = require('./models/Drug');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🔗 Connected to MongoDB');
    
    await Drug.deleteMany({});
    console.log('🗑️ Cleared existing data');
    
    const seedData = [
      {
        name: 'sirolimus',
        disease: 'Castleman disease',
        sourceId: 'manual-001',
        confidence: 0.92
      },
      {
        name: 'sirolimus',
        disease: 'Idiopathic Multicentric Castleman Disease',
        sourceId: 'clinicaltrials-001',
        confidence: 0.87
      }
    ];
    
    await Drug.insertMany(seedData);
    console.log('✅ Seeded 2 sirolimus records');
    
    const count = await Drug.countDocuments();
    console.log(`📊 Total drugs in DB: ${count}`);
    
  } catch (error) {
    console.error('❌ Seed error:', error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seed();
