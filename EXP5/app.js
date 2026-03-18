const express = require('express');
const app = express();
const path = require('path');

app.set('view engine','ejs');
app.set('views','views');

const storeRouter = require('./Routes/storeRouter');
const {hostRouter} = require('./Routes/hostRouter');
const rootDir = require('./utils/pathUtlis');

app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
 });

 app.use(storeRouter)

 app.use(hostRouter)
 app.use(hostRouter)

 const Errorpage = require('./controllers/404');

 app.use(Errorpage.get404);

const PORT = 3000;

app.listen(3000,()=>{
  console.log(`Server running on port ${PORT}`);
});