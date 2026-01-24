import mongoose from "mongoose";
import { User } from "../model/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const getCurrentUser = async (req, res, next) => {
  try {
    // Get userId from token (set by auth middleware)
    const userId = req.user;

    // Validate userId exists
    if (!userId) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    // Fetch user from database
    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Return user data
    res.status(200).json(user);

  } catch (error) {
    console.log("error in backend getCurrentUser", error.message);
    next(new ErrorHandler(error.message, 500));
  }
};

export const updateUserProfile = async (req, res, next) => {
  try {
    const userId = req.user;
    if (!userId) {
      return next(new ErrorHandler("User Not Authenticated Please Login", 400));

    }

    const { name, description } = req.body;

    if (!name) {
      return next(new ErrorHandler("Send Name", 400));
    }

    console.log("yha tak pahucha")
    console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
    console.log("API key:", process.env.CLOUDINARY_API_KEY);

    let photoUrl;
    if (req.file && req.file.path) {
      const result = await uploadOnCloudinary(req.file.path);
      photoUrl = result.secure_url;
    }
    console.log("yha tak pahucha")

    const updateData = {
      name,
      description,
    };

    if (photoUrl) updateData.photoUrl = photoUrl;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );


    res.status(200).json(user);

  } catch (error) {
  console.log("Error in backend update user profile:", error);

  return next(
    new ErrorHandler(
      error?.message || "Something went wrong while updating profile",
      500
    )
  );
}
}
