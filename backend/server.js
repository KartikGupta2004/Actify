import express from "express";
import mongoose from "mongoose";
import colors from "colors";
import morgan from "morgan";
import dotenv from "dotenv";
import {connectDB} from "./config/db.js";
import { router as userRoutes } from "./routes/userRoutes.js";
import { router as jobsRoutes } from "./routes/jobRoutes.js";
import { router as freelancerRoutes } from "./routes/freelancerRoutes.js";
import { router as organisationRoutes } from "./routes/organisationRoutes.js";
import {router as JobAppRoutes} from "./routes/JobApplyRoutes.js"
import cors from "cors";
//dotenv conig
dotenv.config();

//connect to database
connectDB();
//rest object
const app = express();
app.use(cors())
//middlewares
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/jobs", jobsRoutes);
app.use("/api/v1/freelancer", freelancerRoutes);
app.use("/api/v1/org", organisationRoutes);
app.use("/api/v1/freelancejobs",JobAppRoutes);

//port
const port = process.env.PORT || 4000;
//listen port
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});