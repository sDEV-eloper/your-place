import mongoose from "mongoose";

const listSchema=new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
        },
        contact: {
          type: String,
          required:true
        },
        address: {
          type: String,
          required: true,
        },
        regularPrice: {
          type: Number,
          required: true,
        },
        doubleSharingPrice: {
          type: Number,
          required: true,
        },
        tripleSharingPrice: {
          type: Number,
          required: true,
        },
        bathrooms: {
          type: Number,
          required: true,
        },
        bedrooms: {
          type: Number,
          required: true,
        },
        kitchen: {
          type: Boolean,
          required: true,
        },
        furnished: {
          type: Boolean,
          required: true,
        },
        security:{
          type: Boolean,
          required: true,
        },
        electricity:{
          type: Boolean,
          required: true,
        },
        girls:{
          type: Boolean,
          required: true,
        },
        boys:{
          type: Boolean,
          required: true,
        },

        single: {
          type: Boolean,
          required: true,
        }, 
        double: {
          type: Boolean,
          required: true,
        },
        
        triple: {
          type: Boolean,
          required: true,
        },
        
        parking: {
          type: Boolean,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },

        imageUrls: {
          type: Array,
          required: true,
        },
        userRef: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    );
    
    const Listing = mongoose.model('Lists', listSchema);
    
    export default Listing;