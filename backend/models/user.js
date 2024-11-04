import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  username: {
    type: String,
    required: [true, "username is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isEmployee: {
    type: Boolean,
    default: false,
  },
  isFreelancer: {
    type: Boolean,
    default: false,
  },
  },{ timestamps: true });

export const user = mongoose.model('user', userSchema);