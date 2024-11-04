import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    about: {
      type: [String],
      required: true,
    },
    resume: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    notification: {
      type: Array,
      default: [],
    },
    seen_notification: {
      type: Array,
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    embeddings: [Number],
  },
  { timestamps: true }
);

export const Freelancer = mongoose.model("Freelancer", userSchema);
