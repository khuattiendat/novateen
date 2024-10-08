const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect to MongoDB successfully');
    } catch (error) {
        console.log(error.message || error);
        console.log('Connect to MongoDB failed');
    }
}
module.exports = connectDB;