const express = require('express');
const path = require('path');
const userRouter = express.Router();

// const rootDir = require('../utils/pathUtlis');
// const {registerHome} = require('./hostRouter');

const homeController = require('../controllers/home');


userRouter.get("/",homeController.getHome);

 module.exports = userRouter;