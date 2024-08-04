const { CLOUNDINARY_CLOUD_NAME, CLOUNDINARY_API_KEY, CLOUNDINARY_API_SECRET } = require("./serverConfig");

const cloudinary = require("cloudinary").v2;

//configuring cloudinary
cloudinary.config({
    cloud_name: CLOUNDINARY_CLOUD_NAME,
    api_key: CLOUNDINARY_API_KEY,
    api_secret: CLOUNDINARY_API_SECRET
})

module.exports = cloudinary;