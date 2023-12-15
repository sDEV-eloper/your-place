import Listing from "../models/listModel.js"
import { errorHandler } from "../utils/error.js"

export const createList=async(req, res, next)=>{
 
    try{
        const listing=await Listing.create(req.body)
        return res.status(201).json(listing)

    }catch(err){
next(err)
    }
}

export const getList=async(req, res, next)=>{
console.log("-------", req.user._id)
console.log("-------", req.params.id)
 if(req.user._id != req.params.id){
    return next(errorHandler(401, "Only view your own listing"))
 }
 try{
const listings=await Listing.find({ userRef:req.params.id})
res.status(200).json(listings)
 }catch(err){
    next(err)
 }
}