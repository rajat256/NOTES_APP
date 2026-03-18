const Home = require('../models/home');


 exports.getIndex = (req,res,next)=>{
  // console.log(req.url,req.method);
  Home.fetchAll(registerHome=>{
    console.log(registerHome);
     res.render( "store/index", { registerHome: registerHome, pageTitle: "My Index" ,currentPage:"index"});
  });
 }

 exports.getHome = (req,res,next)=>{
  // console.log(req.url,req.method);
  Home.fetchAll(registerHome=>{
    console.log(registerHome);
     res.render( "store/home-list", { registerHome: registerHome, pageTitle: "Home-list" ,currentPage:"home"});
  });
 }

 exports.getBookings = (req,res,next)=>{
  // console.log(req.url,req.method);
  res.render("store/bookings",{ pageTitle: "My Bookings" ,currentPage:"bookings"});
 }


 exports.getFavourites = (req,res,next)=>{
  // console.log(req.url,req.method);
  Home.fetchAll(registerHome=>{
    console.log(registerHome);
     res.render( "store/favourites-list", { registerHome: registerHome, pageTitle: "Favourites List" ,currentPage:"favourites-list"});
  }); }


 
