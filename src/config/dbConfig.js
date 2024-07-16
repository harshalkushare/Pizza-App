const mongoose = require('mongoose');
const serverConfig = require('./serverConfig');

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("Successfully connect to the mongodb server...");
    } catch (error) {
        console.log("Not able to connect to the mongodb server");
        console.log(error);
    }
}

module.exports = connectDB;