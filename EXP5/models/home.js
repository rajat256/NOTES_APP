 const path = require('path');
 const fs = require('fs');
 const rootDir = require('../utils/pathUtlis');
 
 module.exports = class Home{
      constructor(homeName,homePrice,homeLocation,homeRating,homeImage){
        this.homeName = homeName;
        this.homePrice = homePrice;
        this.homeLocation = homeLocation;
        this.homeRating = homeRating;
        this.homeImage = homeImage;
      }
 

save(){
  Home.fetchAll((registerHome)=>{
    registerHome.push(this);   // add new home

    const filepath = path.join(rootDir,'data','home.json');

    fs.writeFile(filepath, JSON.stringify(registerHome), (err)=>{
        if(err){
            console.log(err);
        }
    });
  });
}

 static fetchAll(callback){
    const filepath = path.join(rootDir,'data','home.json');
    fs.readFile(filepath,(err,data)=>{
     console.log(err,data)

     if(!err){
     callback(JSON.parse(data));
     }
     else{
      callback([]);
     }
        });

   
 }

}