const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

const userRouter = require('./Routes/userRouter');
const hostRouter = require('./Routes/hostRouter');

const rootDir = require('./utils/pathUtils');

app.use(bodyParser.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
});

app.use(userRouter);
app.use(hostRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404page.html"));
});

const PORT = 3000;

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});