// server.js
const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/', require('./routes/authRoutes'));
app.use('/posts', require('./routes/postRoutes'));
app.use('/posts', require('./routes/commentRoutes'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
