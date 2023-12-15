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

try{
     if(req.user._id != req.params.id){
        return next(errorHandler(401, "Only view your own listing"))
     }
const listings=await Listing.find({ userRef:req.params.id})
res.status(200).json(listings)
 }catch(err){
    next(err)
 }
}

export const deleteList=async(req, res, next)=>{
    const listing=await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler("No such listing exists", "not found"))
    }
    try{
        if(req.user._id!=listing.userRef){
            return next(errorHandler(401, "Only view your own listing"))
        }
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json("List has been deleted")
    }catch(err){
        next(err)
    }
}

export const updateList=async(req, res, next)=>{
    console.log("reb", req.body)
    const listing=await Listing.findById(req.params.id)
    if(!listing){
        return next(errorHandler("No such listing exists", "not found"))
    }
    if(req.user._id!=listing.userRef){
        return next(errorHandler(401, "Only view your own listing"))
    }
    try{
        
       const updatedNewList= await Listing.findByIdAndUpdate(req.params.id,
        req.body,
      {new: true} 
         )
        res.status(200).json(updatedNewList)
    }catch(err){
        next(err)
    }
}