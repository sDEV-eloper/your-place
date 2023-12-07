import User from '../models/userModel.js'
import bcryptjs from 'bcryptjs'

export const signup= async(req, res)=>{
console.log(req.body)
const {username, email, password} = req.body;
const hashedPassword= bcryptjs.hashSync(password, 10)
//save to database
const newUser= new User({username, email, password:hashedPassword})
try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}