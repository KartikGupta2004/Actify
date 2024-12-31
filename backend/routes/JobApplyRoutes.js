import express from 'express';
import { createJobApplication ,getJobApplicationsByFreelancer, updateApplicantStatus} from '../controllers/JobAppCtrl.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Route for applying to a job
router.post("/apply",authMiddleware, createJobApplication);
router.post("/:jobId/update_applicant_status",authMiddleware, updateApplicantStatus); 
router.get("/my_jobs/:freelancerId",authMiddleware,getJobApplicationsByFreelancer );
export { router};
