const express = require('express');
const hostRouter = express.Router();

const hostController = require('../controllers/hostcontroller');  



 hostRouter.get("/add-home",hostController.getAddHome);
 
  hostRouter.post("/add-home",hostController.postAddHome);
   
 hostRouter.get("/host-homes-list",hostController.gethostHomes);
 exports.hostRouter = hostRouter;
