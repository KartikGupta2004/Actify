import { user } from "../models/user.js";
import { Freelancer } from "../models/freelancer.js";
import UploadOnCloudinary from "../util/upload.js";
import fs from "fs";
import { generateEmbeddings } from "../embeddings/embeddings.js";
import { recommendJobs } from "./recommendJobs.js";
import { Job } from "../models/jobs.js";
// Create Freelancer
const applyFreelancerController = async (req, res) => {
  try {
    console.log("hello boi", req.body);

    // Extract skills and join them into a single string
    const { skills, ...otherData } = req.body; // Destructure skills and other data from request body
    // const skillsJoined = skills.join(" "); // Join skills into a single string
    const skillsJoined = skills;

    // Generate embeddings for the joined skills string
    const skillsEmbeddings = await generateEmbeddings(skillsJoined);

    // Combine other data with the generated embeddings
    const newAccData = { ...otherData, skills, embeddings: skillsEmbeddings };

    // Create a new freelancer entry with the data
    const newFreelancer = await Freelancer.create(newAccData);

    // Fetch the user by ID to check if the user exists
    const userId = req.body.userId;
    const users = await user.findById(userId); // Make sure `User` model is correctly imported and used

    if (!users) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await users.save(); // If there is a specific field to update, do it here before saving

    res.status(201).send({
      success: true,
      message: "Account Applied Successfully",
      data: newFreelancer, // Optionally return the new freelancer data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Account",
    });
  }
};
const getFreelancerbyid = async (req, res) => {
  try {
    const freelancer = await Freelancer.findById(req.params.id);
    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }
    res.status(200).json(freelancer); // Fixed to return freelancer data
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Details Freelancer
const FreelancerInfoController = async (req, res) => {
  try {
    const freelancer = await Freelancer.findOne({ userId: req.body.userId });
    if (!freelancer) {
      return res.status(404).send({
        success: false,
        message: "Freelancer not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Freelancer data fetch success",
      data: freelancer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Details",
    });
  }
};

// Update Profile
const updateProfileController = async (req, res) => {
  try {
    const { userId, skills, ...updateData } = req.body; // Destructure userId, skills, and other update data

    // Generate embeddings for the updated skills string
    const skillsJoined = skills; // Skills already in a desired format
    const skillsEmbeddings = await generateEmbeddings(skillsJoined);

    // Combine update data with the new embeddings
    const updatedData = { ...updateData, skills, embeddings: skillsEmbeddings };

    const freelancer = await Freelancer.findOneAndUpdate(
      { userId },
      updatedData,
      { new: true } // Return the updated document
    );

    if (!freelancer) {
      return res.status(404).send({
        success: false,
        message: "Freelancer not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Freelancer Profile Updated",
      data: freelancer, // Optionally return the updated freelancer data
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Freelancer Profile Update issue",
      error,
    });
  }
};

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    console.log("Uploading:", file.originalname);
    const image = await UploadOnCloudinary(file.path);
    console.log("Uploaded image:", image);

    res.status(200).json({
      message: "File uploaded successfully",
      imageID: image.public_id,
      imageURL: image.secure_url,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Failed to upload file", error: err });
  }
};

const uploadResumeController = async (req, res) => {
  try {
    const file = req.file;
    console.log("Uploading:", file.originalname);
    const resume = await UploadOnCloudinary(file.path);
    console.log("Uploaded resume:", resume);

    res.status(200).json({
      message: "Resume uploaded successfully",
      resumeID: resume.public_id,
      resumeURL: resume.secure_url,
    });
  } catch (err) {
    console.error("Error uploading resume:", err);
    res.status(500).json({ message: "Failed to upload resume", error: err });
  }
};

const getRecommendedJobs = async (req, res) => {
  try {
    console.log("userId",req.body)
    const freelancer = await Freelancer.findOne({ userId: req.body.userId });
    if (!freelancer) {
      return res.status(404).send({
        success: false,
        message: "Freelancer not found",
      });
    }
    const jobs = await Job.find();
    const order = await recommendJobs(jobs, freelancer);
    console.log("in controller",order)
    res.status(200).send({
      success: true,
      message: "Freelancer data fetch success",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Fetching Details",
    });
  }
};

export {
  applyFreelancerController,
  getFreelancerbyid,
  FreelancerInfoController,
  updateProfileController,
  uploadImageController,
  uploadResumeController,
  getRecommendedJobs,
};
