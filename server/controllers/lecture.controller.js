import courseModel from "../model/course.model.js";
import lectureModel from "../model/lecture.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ErrorHandler } from "../utils/error.js";

export const createLecture = async (req, res,next) =>{
    try {
        const {courseId}=req.params;
        
        const course=await courseModel.findById(courseId);
        if(!course){
            return next(new ErrorHandler("Course not found",404));
        }


        const {lectureTitle,isPreviewFree}=req.body;

        if(!req.file){
            return next(new ErrorHandler("Please provide lecture video",400));
        }

        if(!lectureTitle){
            return next(new ErrorHandler("Please provide lecture title",400));
        }

        const videoUrl=await uploadOnCloudinary(req.file.path);
        videoUrl=videoUrl.secure_url;

        const lecture = await lectureModel.create({
            lectureTitle,
            videoUrl,
            isPreviewFree
        })

        course.lectures.push(lecture._id);
        await course.save();

        res.status(201).json({ lecture,course });


    } catch (error) {
         console.log("Create Lecture Error in backend", error)
        next(new ErrorHandler(error.message, 500));
    }
}

export const getLectureById = async (req, res, next) => {
    try {
        const { lectureId } = req.params;

        if (!lectureId) {
            return next(new ErrorHandler("Lecture ID is required", 400));
        }

        const lecture = await lectureModel.findById(lectureId).populate("author");

        if (!lecture) {
            return next(new ErrorHandler("Lecture not found", 404));
        }
        res.status(200).json(lecture);
    } catch (error) {
        console.log("Get lecture by ID Error in backend", error)
        next(new ErrorHandler(error.message, 500));
    }
}