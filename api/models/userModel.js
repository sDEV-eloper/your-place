
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
  username: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  avatar:{
    type:String,

  },
},
{
    timestamps: true
}
);

const User = mongoose.model('User', userSchema);

export default User;
