const express = require('express');
const path = require('path');

const rootDir = require('../utils/pathUtils');

const hostRouter = express.Router();

hostRouter.get('/contact-us',(req,res,next)=>{
    res.sendFile(path.join(rootDir, "views", "addhome.html"));
});

hostRouter.post('/contact-us',(req,res,next)=>{
    console.log(req.body)
    res.sendFile(path.join(rootDir, "views", "homeadded.html"));
});

module.exports = hostRouter;