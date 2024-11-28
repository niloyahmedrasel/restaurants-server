const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();


 const dbConnect = async () => {
    try {
        const uri = process.env.MONGODB_URI; 
        console.log("MongoDB URI:", process.env.MONGODB_URI);
        if (!uri) {
            throw new Error("MongoDB connection string is not defined in environment variables.");
        }
        await mongoose.connect(uri);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
};

module.exports = { dbConnect };