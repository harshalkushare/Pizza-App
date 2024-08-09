const cloudinary = require('../config/cloudinaryConfig');
const ProductRespository = require('../repositories/productRepository');
const fs = require('fs/promises');

async function createProduct(productDetails) {
    //1.we ck if an img is coming to create the product ,then 1st upload it on cloudinary

    const imagePath = productDetails.imagePath;
    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);
        } catch (error) {
            console.log(error);
            throw { reason: "Not able to upload product image", statusCode: 500 };
        }

    }

    //2.Then use the url from cloudinary and other product details to add product in db
    const product = await ProductRespository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    if (!product) {
        throw { reason: "Not able to create product", statusCode: 500 };
    }

    return product;
}

module.exports = {
    createProduct
}