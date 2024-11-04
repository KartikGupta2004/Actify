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
    Applicants: [String],
    embeddings: [Number],
    userId:String
  },
  { timestamps: true }
);

export const Job = mongoose.model("Job", jobSchema);
