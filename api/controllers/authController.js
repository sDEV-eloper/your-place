import User from '../models/userModel.js'

export const signup= async(req, res)=>{
console.log(req.body)
const {username, email, password} = req.body;

//save to database
const newUser= new User({username, email, password})
try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
}