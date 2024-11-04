import mongoose from "mongoose";
const jobApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Freelancer",
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    appliedOn: {
      type: Date,
      default: Date.now,
    },
    hiredOn: Date,
  },
  { timestamps: true }
);

export const JobApplication = mongoose.model(
  "JobApplication",
  jobApplicationSchema
);
