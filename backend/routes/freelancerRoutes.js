import express from "express";
import { applyFreelancerController,getFreelancerbyid, FreelancerInfoController, updateProfileController,uploadImageController, uploadResumeController, getRecommendedJobs } from "../controllers/freelancerCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { recommendJobs } from "../controllers/recommendJobs.js"; 
import upload from '../middlewares/multer.js';
const router = express.Router();

//routes
//Profile || POST
router.post("/profile", authMiddleware, applyFreelancerController);

//VIEW_Profile || GET
router.get("/view_profile", authMiddleware, FreelancerInfoController);

router.get("/view_profile/:id", authMiddleware, getFreelancerbyid);

//Update_Profile || GET
router.put("/update_profile", authMiddleware, updateProfileController);

//Upload_Image
router.post("/upload_image", upload.single("file"), authMiddleware,uploadImageController)

//Upload_Resume
router.post("/upload_resume", upload.single("file"), authMiddleware,uploadResumeController);
router.get("/recommendJobs", authMiddleware, getRecommendedJobs );

export { router };