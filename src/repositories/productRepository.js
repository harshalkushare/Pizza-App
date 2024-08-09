const Product = require("../schema/productSchema");

async function createProduct(productDetails) {
    try {
        const response = Product.create(productDetails);
        return response
    } catch (error) {
        console.log(error);     
    }
}

module.exports = {
     createProduct
}