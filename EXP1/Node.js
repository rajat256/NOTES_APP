const express = require('express');
const app = express();

app.use("/",(req,res,next)=>{
  console.log("Second middleware",req.url,req.method);
  // res.send("Hello from the second middleware");
  next();
})
app.use("/",(req,res,next)=>{
  console.log("Second middleware",req.url,req.method);
  res.send("Hello from the second middleware");
  // next();
})

app.get("/meow",(req,res,next)=>{
  console.log("First middleware",req.url,req.method);
 res.send("Hello from the meow middleware");
})



app.use("/submit-details",(req,res,next)=>{
  console.log("Second middleware",req.url,req.method);
  res.send("Hello from the submit-details middleware");
})

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});