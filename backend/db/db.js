
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI_I}/ToDo`);

        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;