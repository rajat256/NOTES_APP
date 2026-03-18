const express = require('express');
const hostRouter = express.Router();

const homeController = require('../controllers/home');  



 hostRouter.get("/add-home",homeController.getAddHome);



  hostRouter.post("/add-home",homeController.postAddHome);

 exports.hostRouter = hostRouter;
