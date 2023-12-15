import mongoose from "mongoose";

const listSchema=new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        regularPrice: {
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
        furnished: {
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