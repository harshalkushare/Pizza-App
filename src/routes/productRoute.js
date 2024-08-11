//Resource-User
const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../controllers/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authValidater');

const productRouter = express.Router();

productRouter.post('/', isLoggedIn, isAdmin, uploader.single('productImage'), addProduct);
productRouter.get('/:id', getProduct);
productRouter.delete('/:id', deleteProduct);
//this is a route registration

module.exports = productRouter; //exporting the router