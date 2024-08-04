const dotenv = require('dotenv');
dotenv.config()

//here we are exporting all the env variables that the project uses
module.exports = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    CLOUNDINARY_CLOUD_NAME: process.env.CLOUNDINARY_CLOUD_NAME,
    CLOUNDINARY_API_KEY: process.env.CLOUNDINARY_API_KEY,
    CLOUNDINARY_API_SECRET: process.env.CLOUNDINARY_API_SECRET,
}
