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
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
    },
    preferredCauses: {
      type: String,
      required: true,
    },
    availability: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    certificate: {
      type: String,
    },
    photo: {
      type: String,
    },
    notification: [
      {
        message: String,
        date: { type: Date, default: Date.now },
        type: String, // Example: 'info', 'alert'
      },
    ],
    seen_notification: [
      {
        message: String,
        date: { type: Date, default: Date.now },
        type: String,
      },
    ],
    experiences: {
      type: [
        {
          title: String,
          company: String,
          startDate: Date,
          endDate: Date,
          description: String,
          isCurrent: { type: Boolean, default: false },
        },
      ],
      default: null, // Set null by default if no experience is provided
    },
    education: {
      type: [
        {
          institution: String,
          degree: String,
          fieldOfStudy: String,
          startDate: Date,
          endDate: Date,
        },
      ],
      default: null, // Set null by default if no education is provided
    },    
    socialLinks: [
      {
        platform: {
          type: String,
          enum: ['twitter', 'linkedin', 'facebook', 'instagram', 'github', 'other'], // List of allowed platforms
        },
        url: {
          type: String,
          unique: true, // Ensures the URL is unique across all documents
          match: [/^https?:\/\/.+/, 'Invalid URL format'], // Validates the URL format
        },
      },
    ],    
    rating: {
      type: Number,
      default: 0,
    },
    languages: {
      type: String,
      required:true
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    embeddings: [Number], // Used for machine learning/AI features
    appliedJobs: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job", // Assuming there is a Job model to refer to
          required: true,
        },
        title:{
          type: String
        },
        status: {
          type: String,
          enum: ["Applied", "Working", "Completed","Not Selected"], // Status of the job
          default: "applied",
        },
        appliedDate: {
          type: Date,
          default: Date.now,
        },
        startDate: {
          type: Date,
        },
        endDate: {
          type: Date,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Freelancer = mongoose.model("Freelancer", userSchema);
