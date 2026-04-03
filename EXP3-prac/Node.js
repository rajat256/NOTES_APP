const express = require('express');
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('views','views');

const userRouter = require('./Routes/userRouter');
const {hostRouter} = require('./Routes/hostRouter');
const rootDir = require('./utils/pathUtlis');

app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
 });

 app.use(userRouter)

 app.use(hostRouter)
 app.use(hostRouter)

 app.use((req,res,next)=>{
  res.status(404).render("404page", { pageTitle: "404 - Not Found" ,currentPage:404});
 });

const PORT = 3000;

app.listen(3000,()=>{
  console.log(`Server running on port ${PORT}`);
});