import { user } from "../models/user.js";
import { Organisation } from "../models/employee.js";
import UploadOnCloudinary from "../util/upload.js";
import fs from "fs";
// Create Org
// const createOrganisationController = async (req, res) => {
//   try {
//     // Check if an organization with the same unique identifier already exists
//     const existingOrg = await Organisation.findOne({ uniqueField: req.body.uniqueField }); // Replace `uniqueField` with the actual unique field, e.g., `organisationName` or `email`

//     if (existingOrg) {
//       return res.status(400).json({ message: "Organisation profile already exists." });
//     }

//     // If no existing organization is found, proceed to create a new one
//     const newOrg = new Organisation(req.body);
//     const savedOrg = await newOrg.save();
//     res.status(201).json(savedOrg);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Create Organisation Controller
const createOrganisationController = async (req, res) => {
  try {
    // Check if an organization with the same name already exists
    const existingOrg = await Organisation.findOne({ name: req.body.name });
    if (existingOrg) {
      return res
        .status(400)
        .json({
          message: "Organisation profile with this name already exists.",
        });
    }

    // Create a new Organisation object
    const newOrg = new Organisation(req.body);

    // Validate the new organisation object before saving to catch validation errors
    const validationError = newOrg.validateSync();
    if (validationError) {
      console.error("Validation Error:", validationError);
      return res.status(400).json({ message: validationError.message });
    }

    // Save the organisation to the database
    const savedOrg = await newOrg.save();
    res.status(201).json(savedOrg);
  } catch (error) {
    console.error("Error creating organisation:", error);

    // Specific response for duplicate key error (MongoDB unique constraint violation)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `Duplicate value for field: ${duplicateField}` });
    }

    // General error handling
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// Get all Org
const getAllOrgController = async (req, res) => {
  try {
    const org = await Organisation.find();
    res.status(200).json(org);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single Org by ID
const getOrgByIdController = async (req, res) => {
  try {
    const org = await Organisation.findOne({ userId: req.params.id });
    if (!org) {
      return res.status(404).json({ message: "Org not found" });
    }
    res.status(200).json(org);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Org
const deleteOrgController = async (req, res) => {
  try {
    const org = await Organisation.findByIdAndDelete(req.params.id);
    if (!org) {
      return res.status(404).send({ message: "Org not found", success: false });
    }
    res
      .status(200)
      .send({ message: "Org deleted successfully", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Org Profile Delete issue",
      error,
    });
  }
};

// Update Org
const updateOrgController = async (req, res) => {
    try {
      const org = await Organisation.findOneAndUpdate(
        { userId: req.body.userId },  
        req.body,
        { new: true }      
      );
      if (!org) {
        return res.status(404).send({
          success: false,
          message: "Organization not found",
        });
      }
      res.status(201).send({
        success: true,
        message: "Org Profile Updated"
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Org Profile Update issue",
        error,
      });
    }
  };

// Details Org
const OrgInfoController = async (req, res) => {
  try {
    console.log("UserID being queried:", req.body.userId); // Log the userId

    const organise = await Organisation.findOne({ userId: req.body.userId });

    console.log("Organisation found:", organise); // Log the result of the query
    res.status(200).send({
      success: true,
      message: "Organisation data fetch success",
      data: organise,
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
const uploadLogoController = async (req, res) => {
  try {
    const file = req.file;
    console.log("Uploading:", file.originalname);
    const logo = await UploadOnCloudinary(file.path);
    console.log("Uploaded image:", logo);

    res.status(200).json({
      message: "File uploaded successfully",
      logoID: logo.public_id,
      logoURL: logo.secure_url || logo.url,
    });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ message: "Failed to upload file", error: err });
  }
};

export {
  createOrganisationController,
  getAllOrgController,
  getOrgByIdController,
  deleteOrgController,
  updateOrgController,
  OrgInfoController,
  uploadLogoController,
};
