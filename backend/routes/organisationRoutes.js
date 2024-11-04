import express from "express";
import {  createOrganisationController, getAllOrgController, getOrgByIdController, deleteOrgController, updateOrgController, OrgInfoController, uploadLogoController } from "../controllers/organisationCtrl.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import upload from '../middlewares/multer.js';
const router = express.Router();

//routes
//CREATE_Organisation || POST
router.post("/create_org", authMiddleware, createOrganisationController);

//VIEW_ALL_ORG || GET
router.get("/get_all_org", authMiddleware, getAllOrgController);

//VIEW_ORG || GET
router.get("/get_id_org/:id", authMiddleware, getOrgByIdController);

//UPDATE_JOB
router.post("/delete_id_org/:id", authMiddleware, deleteOrgController);

//UPDATE_ORG
router.put("/update_id_org", authMiddleware, updateOrgController);

//VIEW_Profile || GET
router.get("/view_profile", authMiddleware, OrgInfoController);

//Upload_Logo
router.post("/upload_logo", upload.single("file"), authMiddleware,uploadLogoController)

export { router };