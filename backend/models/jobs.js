import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    role: String,
    job_description: String,
    skills_required: [String],
    experience_level: {
      type: String,
      enum: ["Entry Level", "Mid Level", "Senior Level"],
    },
    compensation: String,
    project_duration: {
      type: String,
      enum: ["Short Term", "Long Term", "Contract", "Permanent"],
    },
    application_deadline: Date,
    location_requirements: {
      type: String,
      enum: ["Remote", "On-site", "Hybrid"],
    },
    contact_information: String,
    company_description: String,
    Applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelancer", // Reference to the Freelancer model
      },
    ],
    acceptedApplicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Freelancer", // Stores accepted applicants
      },
    ],
    embeddings: [Number],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model, assuming userId is linked to a User
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
