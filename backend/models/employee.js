import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    roles: {
      type: String,
      required: true,
    },
    logo: {
      type: Array,
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
  },
  { timestamps: true }
);

export const Organisation = mongoose.model("Org", orgSchema);
