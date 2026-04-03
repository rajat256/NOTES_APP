const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
  res.send("Home Page");
});

app.get("/contact-us",(req,res)=>{
  res.send(`
  <form action="/contact-us" method="POST">
    <input type="text" name="name" placeholder="Enter name"/>
    <input type="email" name="email" placeholder="Enter email"/>
    <button type="submit">Submit</button>
  </form>
  `);
});

app.post("/contact-us",(req,res)=>{
  console.log(req.body);
  res.send("Form submitted");
});

const PORT = 3000;

app.listen(3000,()=>{
  console.log(`Server running on port ${PORT}`);
});