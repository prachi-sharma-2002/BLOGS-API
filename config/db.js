// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
