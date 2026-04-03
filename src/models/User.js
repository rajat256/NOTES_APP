const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username:{
    type : String,
    required : [true, 'Username is required'],
    unique : [true, 'Username must be unique']
  },
  email:{
    type : String,
    required : [true, 'Email is required'],
    unique : [true, 'Email must be unique']
  },
  password:{  
    type : String,
    required : [true, 'Password is required']
  }
}, { timestamps: true });   

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;