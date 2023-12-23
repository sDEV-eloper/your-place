import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, phone } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  //save to database
  const newUser = new User({ username, email, phone, password: hashedPassword });
  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail && existingUsername) {
      return res.status(400).json("username and email already exists");
    }
    if (existingUsername) {
      return res.status(400).json("username already exists");
    }
    if (existingEmail) {
      return res.status(400).json("email already exists");
    }
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

//sign in

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found "));
    const validPassword = bcrypt.compareSync(password, validUser.password);

    if (validPassword) {
      const token = jwt.sign({ _id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      //save token inside cookie
      res
        .cookie(" access_token", token, {  httpOnly: true,
          expires: new Date(Date.now() + 100 * 30),
          maxAge: 1000 * 60 * 60 * 24 * 7, })
        .status(200)
        .json(rest);
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    next(err);
  }
};

//continue with google
export const googleAuth = async (req, res, next) => {
  const { email, name, photo } = req.body;
  // console.log('photo url', photo)
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      const token = jwt.sign(
        { _id: existingEmail._id },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = existingEmail._doc;
      //save token inside cookie
      res
        .cookie(" access_token", token, { 
          httpOnly: true,
          expires: new Date(Date.now() + 100 * 30),
          maxAge: 1000 * 60 * 60 * 24 * 7,
         })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new User({
        username: name.split(" ").join("").toLowerCase() + Math.floor(1000 + Math.random() * 9000),
        email,
        password: hashedPassword,
        avatar: photo,
      });
      console.log("Creating new user:", newUser);

      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      //save token inside cookie
      res
        .cookie(" access_token", token, {  httpOnly: true,
          expires: new Date(Date.now() + 100 * 30),
          maxAge: 1000 * 60 * 60 * 24 * 7, })
        .status(200)
        .json(rest);
    }
  } catch (err) {
    next(err);
  }
};