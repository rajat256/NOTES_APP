const express = require('express');
const app = express();

app.use((req,res,next)=>{
  console.log("First dummy middleware",req.url,req.method);
  next();
})
app.use((req,res,next)=>{
  console.log("Second dummy middleware",req.url,req.method);
  next();
})
app.get("/",(req,res,next)=>{
  console.log("Third  middleware",req.url,req.method);
  // res.send("Hello from the third middleware");
  next();
})

app.get("/contact-us",(req,res,next)=>{
  console.log("First middleware",req.url,req.method);
 res.send(`<form action='/contact-us' method='POST'>
    <input type='text' placeholder='Enter your name' name='name'/>  
    <input type='email' placeholder='Enter your email' name='email'/>
    <button type='submit'>Submit</button>
  </form> `);
})

app.post("/contact-us",(req,res,next)=>{
  console.log("Second middleware",req.url,req.method);
  res.send("Hello from the contact-us middleware");
})


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});