// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Global Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI, {
    // optional: mongoose 7+ doesn’t require these, but safe to leave
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('❌ Error connecting to MongoDB Atlas:', err.message);
    process.exit(1); // Exit if DB connection fails
  });

// ===== Basic Test Route =====
app.get('/', (req, res) => {
  res.send('MEDAD Backend is running and connected to MongoDB (if no errors above).');
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
