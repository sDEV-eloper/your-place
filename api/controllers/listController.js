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

export const getListData=async(req, res, next)=>{
const id=req.params.id;
try{
    const data=await Listing.findById(id)
    if(!data){
        return next(errorHandler(404, "Data no found"))
    }
    res.status(200).json(data)
}catch(err){
    next(err)
}
}

export const getAllList= async (req, res, next) => {
    try {
        console.log(req.query)
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
  
      let furnished = req.query.furnished;
  
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
      let single = req.query.single;
      let double = req.query.double;
      let triple = req.query.triple;
      let kitchen = req.query.kitchen;
      let electricity = req.query.electricity;
      let boys = req.query.boys;
      let girls = req.query.girls;
      let security = req.query.security;
  
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
      if (single === undefined || single === 'false') {
        single = { $in: [false, true] };
      }
      if (double === undefined || double === 'false') {
        double = { $in: [false, true] };
      }
      if (triple === undefined || triple === 'false') {
        triple = { $in: [false, true] };
      }
      if (security === undefined || security === 'false') {
        security = { $in: [false, true] };
      }
      if (kitchen === undefined || kitchen === 'false') {
        kitchen = { $in: [false, true] };
      }
      if (electricity=== undefined || electricity=== 'false') {
        electricity= { $in: [false, true] };
      }
      if (boys === undefined || boys === 'false') {
        boys = { $in: [false, true] };
      }
      if (girls === undefined || girls === 'false') {
        girls = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === 'all') {
        type = { $in: ['available', 'unavailable'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
  
      const sort = req.query.sort || 'createdAt';
  
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },  
        furnished,
        parking,
        type,
        boys,
        girls,
        electricity,
        kitchen,
        single,
        double,
        triple,
        security,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  };