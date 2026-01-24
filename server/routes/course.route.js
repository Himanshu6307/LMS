import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { createCourse, deleteCourse, editCourse, getCourseById, getCreatedCourse, getPublicCourse } from '../controllers/course.controller.js';
import upload from '../middleware/multer.js';
const courseRouter = express.Router();

courseRouter.get('/getcourse',isAuthenticated,getPublicCourse);
courseRouter.post('/createcourse',isAuthenticated,createCourse);
courseRouter.post('/editcourse/:courseId',isAuthenticated,upload.single("thumbnail"),editCourse);
courseRouter.get('/getcreatedcourse',isAuthenticated,getCreatedCourse);
courseRouter.get('/getcoursebyid/:courseId',isAuthenticated,getCourseById);
courseRouter.delete('/deletecourse/:courseId',isAuthenticated,deleteCourse);
export default courseRouter;