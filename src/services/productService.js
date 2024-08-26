const cloudinary = require('../config/cloudinaryConfig');
const ProductRespository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');

async function createProduct(productDetails) {
    //1.we ck if an img is coming to create the product ,then 1st upload it on cloudinary

    const imagePath = productDetails.imagePath;
    if (imagePath) {
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(process.cwd() + "/" + imagePath);
        } catch (error) {
            console.log(error);
            throw new InternalServerError();
        }

    }

    //2.Then use the url from cloudinary and other product details to add product in db
    const product = await ProductRespository.createProduct({
        ...productDetails,
        productImage: productImage
    });

    return product;

}

async function getProductById(productId) {
    const response = await ProductRespository.getProductById(productId);
    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProductById(productId) {
    const response = await ProductRespository.deleteProductById(productId);
    //logic for catch imageName from imageUrl
    const imageUrl = response.productImage;
    const urlArray = imageUrl.split('/');
    console.log(urlArray);
    const Name = urlArray[urlArray.length - 1];
    console.log(Name);
    const imageName = Name.split('.')[0]
    console.log(imageName);

    await cloudinary.uploader.destroy(imageName);

    if (!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}