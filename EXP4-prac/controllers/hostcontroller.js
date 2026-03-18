const Home = require('../models/home');

exports.getAddHome = (req,res,next)=>{
     res.render('host/addhome',{ pageTitle: "Add Home - Airbnb",currentPage:"add-home"});
}

 exports.gethostHomes = (req,res,next)=>{
  // console.log(req.url,req.method);
  Home.fetchAll(registerHome=>{
    console.log(registerHome);
     res.render( "host/host-homelist", { registerHome: registerHome, pageTitle: "Host Homes" ,currentPage:"host-homelist"});
  });
 }

exports.postAddHome = (req,res,next)=>{

     const {homeName,homePrice,homeLocation,homeRating,homeImage} = req.body;
     const home = new Home(homeName,homePrice,homeLocation,homeRating,homeImage);
     home.save();
 
     console.log(req.body.homeName,req.body.homePrice,req.body.homeLocation,req.body.homeRating);
     res.render('host/homeadded',{ pageTitle: "Home Added - Airbnb" ,currentPage:"homeadded"});
  //  res.sendFile(path.join(__dirname, "../", "views", "homeadded.html"));
 }


 