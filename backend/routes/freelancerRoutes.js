import express from "express";
import { applyFreelancerController,getFreelancerbyid, FreelancerInfoController, updateProfileController,uploadImageController, uploadCertificateController, getRecommendedJobs } from "../controllers/freelancerCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from '../middlewares/multer.js';
const router = express.Router();

//routes
//Profile || POST
router.post("/profile", authMiddleware, applyFreelancerController);

//VIEW_Profile || GET
router.get("/view_profile", authMiddleware, FreelancerInfoController);

router.get("/view_profile/:id", authMiddleware, getFreelancerbyid);

//Update_Profile || PUT
router.put("/update_profile", authMiddleware, updateProfileController);

//Upload_Image
router.post("/upload_image", upload.single("file"), authMiddleware,uploadImageController)

//Upload_Certificate
router.post("/upload_certificate", upload.single("file"), authMiddleware,uploadCertificateController);
router.get("/recommendJobs", authMiddleware, getRecommendedJobs );

export { router };