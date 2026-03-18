const express = require('express');
const path = require('path');
const hostRouter = express.Router();

const rootDir = require('../utils/pathUtlis');


 hostRouter.get("/add-home",(req,res,next)=>{
     res.render('addhome',{ pageTitle: "Add Home - Airbnb",currentPage:"add-home"});
   
 });

 const registerHome = [];

  hostRouter.post("/add-home",(req,res,next)=>{
    // console.log(req.body,req.body.homeName);
    //     registerHome.push({homeName: req.body.homeName,
    //         homePrice: req.body.homePrice,
    //         homeLocation: req.body.homeLocation,
    //         homeRating: req.body.homeRating
    //     });
    console.log(req.body);
        registerHome.push(req.body);
        console.log(req.body.homeName,req.body.homePrice,req.body.homeLocation,req.body.homeRating);
       res.render('homeadded',{ pageTitle: "Home Added - Airbnb" ,currentPage:"homeadded"});
  //  res.sendFile(path.join(__dirname, "../", "views", "homeadded.html"));
 });

 exports.hostRouter = hostRouter;
 exports.registerHome = registerHome;