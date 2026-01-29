import express from "express";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { createLecture, deleteLecture, editLecture } from "../controllers/lecture.controller.js";
import upload from "../middleware/multer.js";
const lectureRouter = express.Router();


lectureRouter.post("/createlecture/:courseId",isAuthenticated,createLecture);
lectureRouter.get("/deletelecture/:courseId/:lectureId",isAuthenticated,deleteLecture);
lectureRouter.post("/editlecture/:courseId/:lectureId",isAuthenticated,upload.single("videoUrl"),editLecture);

export default lectureRouter;