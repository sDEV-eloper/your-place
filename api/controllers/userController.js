import User from "../models/userModel.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'


export const updateUserInfo= async (req, res, next)=>{
    if(req.user?._id!=req.params?.id) return next(errorHandler(401, "you can only update your own account" ))
    try{
if(req.body.password){
    req.body.password=bcryptjs.hashSync(req.body.password, 10)
}
const updatedUser=await User.findByIdAndUpdate(req.params.id, 
    { $set:{
        username: req.body?.username,
        email:req.body?.email,
        password:req.body?.password,
        avatar:req.body?.avatar,
    }
},{new: true} )//save new info from updated User
const {password, ...rest}=updatedUser._doc
res.status(200).json(rest)
}catch(err){
    next(err)
}
}