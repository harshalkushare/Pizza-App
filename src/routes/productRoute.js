//Resource-User
const express = require('express');
const { addProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');

const productRouter = express.Router();

productRouter.post('/', uploader.single('productImage'), addProduct); //this is a route registration

module.exports = productRouter; //exporting the router