const express = require('express');
const path = require('path');
const userRouter = express.Router();

const rootDir = require('../utils/pathUtlis');


userRouter.get("/",(req,res,next)=>{
  console.log(req.url,req.method);
  res.sendFile(path.join(rootDir, "views", "home.html"));
 });

 module.exports = userRouter;