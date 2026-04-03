const express = require('express');
const path = require('path');
const userRouter = express.Router();

// const rootDir = require('../utils/pathUtlis');
const {registerHome} = require('./hostRouter');


userRouter.get("/",(req,res,next)=>{
  // console.log(req.url,req.method);
  console.log(registerHome);
  res.render( "home", { registerHome: registerHome, pageTitle: "Airbnb - Home" });
 });

 module.exports = userRouter;