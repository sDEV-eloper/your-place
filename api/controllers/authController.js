import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup= async(req, res, next)=>{
console.log(req.body)
const {username, email, password} = req.body;
const hashedPassword= bcrypt.hashSync(password, 10)
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

//sign in

export const signin= async(req, res, next)=>{
  const {email, password}=req.body;
  try{
    const validUser=await User.findOne({email});
    if(!validUser) return next(errorHandler(404, "user not found "))
    const validPassword=  bcrypt.compareSync(password, validUser.password)

    console.log("VP--->", validPassword)
    if (validPassword) {
      res.status(200).json({ message: "signed in successfully" });
      const token=jwt.sign({ _id: validUser._id}, process.env.JWT_SECRET)
        const {password:pass , ...rest}=validUser._doc;
        //save token inside cookie
        res.cookie(' access token', token, {httpOnly: true, }).status(200).json(rest)
      }else{
        res.status(401).json({message: "Invalid password"});
      }
  }catch(err){
    next(err)
  }
}