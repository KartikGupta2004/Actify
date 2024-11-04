import express from 'express';
import { createJobApplication ,getJobApplicationsByFreelancer} from '../controllers/JobAppCtrl.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";
const router = express.Router();

// Route for applying to a job
router.post("/apply",authMiddleware, createJobApplication);
router.get("/my_jobs/:freelancerId",authMiddleware,getJobApplicationsByFreelancer );
export { router};
