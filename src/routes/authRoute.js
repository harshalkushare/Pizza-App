const express = require('express');
const { login } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', login); //this is a route registration

module.exports = authRouter; //exporting the router