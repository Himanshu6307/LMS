import courseModel from "../model/course.model.js";
import lectureModel from "../model/lecture.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ErrorHandler } from "../utils/error.js";

export const createLecture = async (req, res, next) => {
    try {
        const { courseId } = req.params;

        const course = await courseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }


        const { lectureTitle } = req.body;

        // if (!req.file) {
        //     return next(new ErrorHandler("Please provide lecture video", 400));
        // }

        if (!lectureTitle) {
            return next(new ErrorHandler("Please provide lecture title", 400));
        }

        // const videoUrl = await uploadOnCloudinary(req.file.path);
        // videoUrl = videoUrl.secure_url;

        const lecture = await lectureModel.create({
            lectureTitle,
        })

        course.lectures.push(lecture._id);
        await course.populate("lectures");
        await course.populate("creator");
        await course.save();

        res.status(201).json({ lecture, course });


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

export const deleteLecture = async (req, res, next) => {
    try {
        const { lectureId } = req.params;
        const { courseId } = req.params;

        if (!lectureId || !courseId) {
            return next(new ErrorHandler("Lecture ID and Course ID is required", 400));
        }

        const lecture = await lectureModel.findByIdAndDelete(lectureId);
        if (!lecture) {
            return next(new ErrorHandler("Lecture not found", 404));
        }

        const course = await courseModel.findByIdAndUpdate(
            courseId,
            { $pull: { lectures: lectureId } },
            { new: true }
        );

        await course.populate("lectures");
        await course.populate("creator");

        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }


        res.status(200).json({ message: "Lecture deleted successfully", course });

    } catch (error) {
        console.log("Delete lecture Error in backend", error)
        next(new ErrorHandler(error.message, 500));
    }
}

export const editLecture = async (req, res, next) => {
    try {
        const { courseId } = req.params;
        const { lectureId } = req.params;
        
        const { lectureTitle, isPreviewFree } = req.body;

        if (!lectureId || !courseId) {
            return next(new ErrorHandler("Lecture ID and Course ID is required", 400));
        }

        const lecture = await lectureModel.findById(lectureId);
        if (!lecture) {
            return next(new ErrorHandler("Lecture not found", 404));
        }

         let videoUrl;
        if (req.file) {
            videoUrl = await uploadOnCloudinary(req.file.path);
            lecture.videoUrl = videoUrl.secure_url;
        }

        if(lectureTitle)
        lecture.lectureTitle = lectureTitle;

        lecture.isPreviewFree = isPreviewFree;
        await lecture.populate("author");
        await lecture.save();
      

        // const updateData = {
        //     lectureTitle,
        //     videoUrl: videoUrl.secure_url,
        //     isPreviewFree
        // };

        // const lecture = await lectureModel.findOneAndUpdate(
        //     { _id: lectureId },
        //     updateData,
        //     { new: true }
        // ).populate("author");

        // if (!lecture) {
        //     return next(new ErrorHandler("Lecture not found", 404));
        // }

        const course = await courseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }
        course.lectures.push(lecture._id);
        await course.populate("lectures");
        await course.populate("creator");
        await course.save();

        res.status(200).json({ lecture, course });
    } catch (error) {
        console.log("Edit lecture Error in backend", error)
        next(new ErrorHandler(error.message, 500));
    }
}

