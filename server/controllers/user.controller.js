import { User } from "../model/user.model.js";
import { ErrorHandler } from "../utils/error.js";

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
