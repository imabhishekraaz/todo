require('dotenv').config();
const mongoose = require('mongoose');

const mongoDB = async () => {
    const mongoURI = process.env.DB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/taskdb';

    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB Connected successfully...');
    } catch (err) {
        console.log('MongoDB connection failed:', err.message);
    }
};

module.exports = {
    mongoDB
};


