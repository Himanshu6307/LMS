import courseModel from "../model/course.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { ErrorHandler } from "../utils/error.js";

export const createCourse = async(req,res,next)=>{
    try {
        const userId=req.user;
        const {title,category}=req.body;
        if(!title || !category){
            return next(new ErrorHandler("Title and Category are required",400));
        }
        const course = await courseModel.create({
            title,
            category,
            creator:userId
        });
        await course.populate("creator");
        res.status(201).json({course});

    } catch (error) {
        console.log("Create course Error in backend",error)
        next(new ErrorHandler(error.message,500));
    }
}

export const getPublicCourse=async(req,res,next)=>{
    try {
        const courses=await courseModel.find({isPublic:true}).populate("creator",);
        if(!courses){
            return next(new ErrorHandler("No public courses found",404));
        };

        res.status(200).json({courses});

    } catch (error) {
        console.log("Get courses Error in backend",error)
        next(new ErrorHandler(error.message,500));
    }
}

export const getCreatedCourse=async(req,res,next)=>{
    try {
        const userId=req.user;
        const courses=await courseModel.find({creator:userId}).populate("creator",);
        if(!courses){
            return next(new ErrorHandler("No courses found",404));
        };

        res.status(200).json({courses});
    } catch (error) {
        console.log("Get created courses Error in backend",error)
        next(new ErrorHandler(error.message,500));
    }
}

export const editCourse=async(req,res,next)=>{
    try {
        const {courseId}=req.params;
        const {title,subTitle,category,description,isPublished,level,price}=req.body;
        let thumbnail;

        if(req.file){
            thumbnail=await uploadOnCloudinary(req.file.path).secure_url;
        }

        const updateData={
            title,
            subTitle,
            category,
            description,
            isPublished,
            level,
            price,
            thumbnail
        };

        const course=await courseModel.findOneAndUpdate(
            {_id:courseId},
            updateData,
            {new:true}
        ).populate("creator");

        if(!course){
            return next (new ErrorHandler("Course not found",404));
        }

        res.status(200).json(course);
    } catch (error) {
        console.log("Edit course Error in backend",error)
        next(new ErrorHandler(error.message,500));
    }
}

export const deleteCourse=async(req,res,next)=>{
    try {
        const {courseId}=req.params;
        const course = await courseModel.findById(courseId);
        if (!course) {
            return next(new ErrorHandler("Course not found", 404));
        }

        course=await courseModel.findOneAndDelete({_id:courseId},{new:true});

        if(!course){
            return next (new ErrorHandler("Course not found",404));
        }

        res.status(200).json({message:"Course deleted successfully"});

    } catch (error) {
        console.log("Delete course Error in backend",error)
        next(new ErrorHandler(error.message,500));
    }
}

export const getCourseById=async(req,res,next)=>{
    try {
        const {courseId}=req.params;
        const course=await courseModel.findById(courseId).populate("creator");
        if(!course){
            return next (new ErrorHandler("Course not found",404));
        }
        res.status(200).json(course);
    } catch (error) {
        console.log("Get course by ID Error in backend",error)
        next(new ErrorHandler(error.message,500));
    }
}
