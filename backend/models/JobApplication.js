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
      enum: ["Pending", "Accepted", "Rejected", "Filled"],
      default: "Pending",
    },
    appliedOn: {
      type: Date,
      default: Date.now,
    },
    hiredOn: {
      type: Date,
      default: null, // Only set when status is "Accepted" or "Filled"
    },
  },
  { timestamps: true }
);

// Middleware to automatically set hiredOn when applicationStatus changes to "Accepted" or "Filled"
jobApplicationSchema.pre("save", function (next) {
  if (this.isModified("applicationStatus")) {
    if (this.applicationStatus === "Accepted" || this.applicationStatus === "Filled") {
      this.hiredOn = Date.now();
    } else if (this.applicationStatus === "Rejected" || this.applicationStatus === "Pending") {
      this.hiredOn = null; // Reset hiredOn if the application status is changed back
    }
  }
  next();
});

export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
