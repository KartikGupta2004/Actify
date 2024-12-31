import { JobApplication } from "../models/JobApplication.js"; // Import the JobApplication model
import { Job } from "../models/jobs.js"; // Import the Job model to update Applicants array
import { Freelancer } from "../models/freelancer.js"; // Import the Freelancer model
import nodemailer from "nodemailer";

const sendNotificationEmail = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',  // Explicitly define the SMTP host
      port: 587,  // Standard port for sending email
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
    });
    // console.log(`Email sent to ${email} with subject: ${subject}`);
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
};
// Controller to create a job application
const createJobApplication = async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    const freelancer = await Freelancer.findOne({ userId });
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    const freelancerId = freelancer._id;
    const jobApplication = new JobApplication({
      jobId,
      freelancerId,
      applicationStatus: "Pending", // Default status
    });
    await jobApplication.save();

    const title = job.role;
    
    if (!job.Applicants.includes(freelancerId)) {
      job.Applicants.push(freelancerId);
      await job.save(); // Save the updated Job document
    }
    const appliedJob = {
      jobId,
      title,
      seen:false,
      status: "Applied", // Set the status as "Applied" when freelancer applies
      appliedDate: new Date(),
      description: job.job_description, // Add job description
    };

    // Update the freelancer's appliedJobs array
    freelancer.appliedJobs.push(appliedJob);
    await freelancer.save();

    return res.status(201).json({
      message: "Job application submitted successfully",
      jobApplication,
    });
  } catch (error) {
    console.error("Error submitting job application:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};

// Controller to get job applications by freelancerId
const getJobApplicationsByFreelancer = async (req, res) => {
  try {
    console.log(req.params)
    const { freelancerId } = req.params; // Extract freelancerId from URL
    const jobApplications = await JobApplication.find({ freelancerId });

    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).json({ message: 'No job applications found for this freelancer.' });
    }

    const jobs = await Promise.all(
      jobApplications.map(async (application) => {
        const job = await Job.findById(application.jobId);
        return job; // Add the job to the array
      })
    );
    
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching job applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to accept or reject an applicant for a specific job
const updateApplicantStatus = async (req, res) => {
  const { applicantId, status } = req.body; // Accepts 'Accepted' or 'Rejected'
  const { jobId } = req.params; // Get the jobId from the URL params

  // Validate status
  if (!["Accepted", "Rejected"].includes(status)) {
    console.log("Invalid status received:", status);
    return res.status(400).json({ message: "Invalid status. Use 'Accepted' or 'Rejected'." });
  }

  try {
    // Fetch freelancer
    console.log("Fetching freelancer with applicantId:", applicantId);
    const freelancer = await Freelancer.findOne({ _id: applicantId });

    if (!freelancer) {
      console.log("Freelancer not found for applicantId:", applicantId);
      return res.status(404).json({ message: "Freelancer not found" });
    }

    // Log freelancer's appliedJobs
    // console.log("Freelancer's applied jobs:", freelancer.appliedJobs);

    // Find the specific applied job entry
    const appliedJob = freelancer.appliedJobs.find((job) => job.jobId.toString() === jobId.toString());
    if (!appliedJob) {
      console.log("Applied job not found for jobId:", jobId);
      return res.status(404).json({ message: "Applied job not found" });
    }

    // Update the applied job status and dates
    if (status === "Accepted") {
      appliedJob.status = "Working";
      appliedJob.startDate = new Date();
      // console.log("Applied job status updated to 'Working' and startDate set:", appliedJob.startDate);
    } else if (status === "Rejected") {
      appliedJob.status = "Not Selected";
      appliedJob.endDate = new Date();
      // console.log("Applied job status updated to 'Not Selected' and endDate set:", appliedJob.endDate);
    }

    // Save the updated freelancer's applied jobs
    await freelancer.save();
    // console.log("Freelancer's applied jobs updated and saved.");

    // Update job application status in JobApplication model
    // console.log("Fetching job application for jobId:", jobId, "and freelancerId:", applicantId);
    const jobApplication = await JobApplication.findOne({ jobId: jobId.toString(), freelancerId: applicantId.toString() });
    
    if (!jobApplication) {
      // console.log("Job application not found for jobId and freelancerId:", jobId, applicantId);
      return res.status(404).json({ message: "Job application not found" });
    }

    jobApplication.applicationStatus = status;
    await jobApplication.save();
    // console.log("Job application status updated and saved.");

    // Find the job and update acceptedApplicants or Applicants array accordingly
    // console.log("Fetching job for jobId:", jobId);
    const job = await Job.findById(jobId);
    if (!job) {
      console.log("Job not found for jobId:", jobId);
      return res.status(404).json({ message: "Job not found" });
    }

    if (!job.acceptedApplicants) job.acceptedApplicants = [];
    if (!job.Applicants) job.Applicants = [];

    // Handle accepted applicant logic
    if (status === "Accepted") {
      if (!job.acceptedApplicants.includes(applicantId)) {
        job.acceptedApplicants.push(applicantId);
      }
      // console.log("Applicant added to acceptedApplicants for jobId:", jobId);
      await sendNotificationEmail(freelancer.email, "Job Offer Accepted", "Congratulations on being recruited!");
    } else if (status === "Rejected") {
      // job.Applicants = job.Applicants.filter((id) => id.toString() !== applicantId.toString());
      // console.log("Applicant removed from Applicants for jobId:", jobId);
      await sendNotificationEmail(freelancer.email, "Job Application Rejected", "Thank you for applying, but you were not selected.");
    }

    // Save the job after modifications
    await job.save();
    console.log("Job updated and saved for jobId:", jobId);

    return res.status(200).json({ message: `Applicant ${status}`, jobApplication });
  } catch (error) {
    console.error("Error updating applicant status:", error);
    return res.status(500).json({ message: "Server error, please try again" });
  }
};





// Export the functions for use in routes
export { createJobApplication, getJobApplicationsByFreelancer, updateApplicantStatus };
