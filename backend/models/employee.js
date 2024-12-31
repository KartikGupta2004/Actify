import mongoose from "mongoose";

const orgSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true, // Unique ID for the organization user
    },
    name: {
      type: String,
      required: true, // Name of the organization
    },
    description: {
      type: String,
      required: true, // A brief description of the organization
    },
    roles: {
      type: String,
      required: true, // Roles the organization is offering (e.g., "Volunteer Coordinator", "Event Manager")
    },
    location: {
      type: String,
      required: true, // Location of the organization (can be city, state, or region)
    },
    contactInfo: {
      phone: {
        type: String,
        required: true, // Organization's contact number
      },
      email: {
        type: String,
        required: true, // Organization's email address
      },
      website: {
        type: String, // Optional: A link to the organization's website
      },
    },
    socialLinks: {
      twitter: { type: String },
      linkedin: { type: String },
      facebook: { type: String },
    },
    logo: {
      type: String, // Link to the organization's logo image (can be uploaded to cloud storage)
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
