import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup= async(req, res, next)=>{
console.log(req.body)
const {username, email, password} = req.body;
const hashedPassword= bcryptjs.hashSync(password, 10)
//save to database
const newUser= new User({username, email, password:hashedPassword})
try {
  const existingEmail = await User.findOne({email});
  const existingUsername = await User.findOne({username});
  if(existingEmail && existingEmail){
      return res.status(400).json('username and email already exists');
    }
if (existingUsername) {
  return res.status(400).json('username already exists');
  }
if (existingEmail) {
  return res.status(400).json('email already exists');
}
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error)
  }
}

export const signin= async(req, res, next)=>{
  const {email, password}=req.body;
  try{
    const validUser=await User.findOne({email});
    if(!validUser) return next(errorHandler(404, "user not found "))
    const validPassword=  bcryptjs.compareSync(password, validUser.password)
  const token=jwt.sign({
    _id: validUser._id}, process.env.JWT_SECRET)

    const {password:pass , ...rest}=validUser._doc;
    //save token inside cookie
    res.cookie(' acces token', token, {httpOnly: true, }).status(200).json(rest)
  if(!validPassword) return next(errorHandler(401, "invalid password"))
  }catch(err){
    next(err)
  }
}