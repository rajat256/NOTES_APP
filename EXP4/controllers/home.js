const Home = require('../models/home');

exports.getAddHome = (req,res,next)=>{
     res.render('addhome',{ pageTitle: "Add Home - Airbnb",currentPage:"add-home"});
}

exports.postAddHome = (req,res,next)=>{

     const {homeName,homePrice,homeLocation,homeRating,homeImage} = req.body;
     const home = new Home(homeName,homePrice,homeLocation,homeRating,homeImage);
     home.save();
 
     console.log(req.body.homeName,req.body.homePrice,req.body.homeLocation,req.body.homeRating);
     res.render('homeadded',{ pageTitle: "Home Added - Airbnb" ,currentPage:"homeadded"});
  //  res.sendFile(path.join(__dirname, "../", "views", "homeadded.html"));
 }

 exports.getHome = (req,res,next)=>{
  // console.log(req.url,req.method);
  Home.fetchAll(registerHome=>{
    console.log(registerHome);
     res.render( "home", { registerHome: registerHome, pageTitle: "Airbnb - Home" ,currentPage:"home"});
  });


 }

