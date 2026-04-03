const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtlis');


 hostRouter.get("/add-home",(req,res,next)=>{
     res.sendFile(path.join(rootDir, "views", "addhome.html"));
   
 });

  hostRouter.post("/add-home",(req,res,next)=>{
   res.sendFile(path.join(rootDir,"views", "homeadded.html"));
  //  res.sendFile(path.join(__dirname, "../", "views", "homeadded.html"));
 });

 module.exports = hostRouter;