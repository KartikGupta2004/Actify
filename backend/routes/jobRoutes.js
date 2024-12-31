import express from "express";
import { createJobController, getAllJobsController, getJobByIdController, updateJobController, deleteJobController, viewJobsCompanySpecific } from "../controllers/jobsCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//CREATE_JOB || POST
router.post("/create_job", authMiddleware, createJobController);

//VIEW_ALL_JOBS || GET
router.get("/get_all_job", authMiddleware, getAllJobsController);

//VIEW_JOB || GET
router.get("/get_id_job/:id", authMiddleware, getJobByIdController);

//UPDATE_JOB || POST
router.put("/update_id_job/:id", authMiddleware, updateJobController);

//DELETE_JOB || POST
router.post("/delete_id_job/:id", authMiddleware, deleteJobController);

//VIEW_JOBS_COMPANY || GET
router.get("/get_company_job", authMiddleware, viewJobsCompanySpecific);

export { router };