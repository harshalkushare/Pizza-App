//Resource-User
const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);
//this is a route registration

module.exports = productRouter; //exporting the router