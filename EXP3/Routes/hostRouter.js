const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtlis');


 hostRouter.get("/add-home",(req,res,next)=>{
     res.render('addhome',{ pageTitle: "Add Home - Airbnb" });
   
 });

 const registerHome = [];

  hostRouter.post("/add-home",(req,res,next)=>{
    console.log(req.body,req.body.homeName);
        registerHome.push({homeName: req.body.homeName});
        console.log(req.body.homeName)
       res.render('homeadded',{ pageTitle: "Home Added - Airbnb" });
  //  res.sendFile(path.join(__dirname, "../", "views", "homeadded.html"));
 });

 exports.hostRouter = hostRouter;
 exports.registerHome = registerHome;