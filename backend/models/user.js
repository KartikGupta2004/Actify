import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: function () { return this.authProvider !== 'google'; }, // Required only if not Google OAuth
  },
  authProvider: {
    type: String,
    enum: ['email', 'google'],
    required: true,
    default: 'email',
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
}, { timestamps: true });

export const user = mongoose.model('user', userSchema);
