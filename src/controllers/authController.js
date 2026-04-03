const Usermodel = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

exports.signup = async (req, res) => {

  try{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
      return res.status(400).json({error: 'All fields are required'});
    }

    const existingUser = await Usermodel.findOne({
      $or : [{username},{email}]
    });
    if(existingUser){
      return res.status(400).json({error: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await Usermodel.create({
      username,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      {userId:user._id},
      config.JWT_SECRET,
      {expiresIn: '1h'}
    );  
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        username: user.username,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
  }

}

exports.login = async (req, res) => {
  try{
    const {email,password} = req.body;
    if(!email || !password){
      return res.status(400).json({error: 'Email and password are required'});
    }

    const user = await Usermodel.findOne({
      email
    })
    if(!user){
      return res.status(400).json({error: 'Invalid credentials'});
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({error: 'Invalid credentials'});
    }

    const token = jwt.sign(
      {userId:user._id},
      config.JWT_SECRET,
      {expiresIn: '1h'}
    );
    return res.status(200).json({message: 'Login successful', token});
  }catch(error){
    console.error(error);
    return res.status(500).json({error: 'Internal server error'});
  }   
}