import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/error.js";

export const isAuthenticated = (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    let token = req.cookies?.token || req.headers.authorization?.split(" ")[1];


    // Check if token is present
    if (!token) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );

    // Set user ID in request object
    req.user = decoded.userId;

    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid token", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Token expired", 401));
    }
    return next(new ErrorHandler("User not authenticated", 401));
  }
};
