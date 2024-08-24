const express = require('express');
const { login, logout } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post('/login', login); //this is a route registration
authRouter.post('/logout', logout);

module.exports = authRouter; //exporting the router