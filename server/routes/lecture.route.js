import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createLecture } from "../controllers/lecture.controller.js";
import upload from "../middleware/multer.js";
const lectureRouter = express.Router();


lectureRouter.post("/createlecture",isAuthenticated,upload.single("videoUrl"),createLecture);

export default lectureRouter;