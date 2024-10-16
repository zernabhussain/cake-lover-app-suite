const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const cakeRoutes = require('./routes/cake.routes');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api', cakeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
