import { User } from "../model/user.model.js";
import { ErrorHandler } from "../utils/error.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate all required fields
    if (!name || !email || !password || !role) {
      return next(
        new ErrorHandler("Please provide all required fields", 400)
      );
    }

    // Validate name
    if (name.length > 100) {
      return next(new ErrorHandler("Name cannot exceed 100 characters", 400));
    }

    // Validate email using validator library
    if (!validator.isEmail(email)) {
      return next(new ErrorHandler("Please provide a valid email", 400));
    }

    // Validate email length
    if (email.length > 100) {
      return next(new ErrorHandler("Email cannot exceed 100 characters", 400));
    }

    // Validate password length
    if (password.length < 5) {
      return next(
        new ErrorHandler("Password must be at least 5 characters", 400)
      );
    }

    // Validate role
    const validRoles = ["student", "educator"];
    if (!validRoles.includes(role)) {
      return next(
        new ErrorHandler("Please select a valid role (student or educator)", 400)
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(
        new ErrorHandler("User with this email already exists", 400)
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Generate JWT token with only userId
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Return success response
    res.cookie("token",token,{
        httpOnly:true,
        sameSite:"Strict",
        secure:false,
        maxAge:7*24*60*60*1000
    }).status(201).json(user);

  } catch (error) {
    console.log("error in backend signup", error.message);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return next(
        new ErrorHandler("Please provide email and password", 400)
      );
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return next(new ErrorHandler("Please provide a valid email", 400));
    }

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    // Generate JWT token with only userId
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json(user);

  } catch (error) {
    console.log("error in backend login", error.message);
    next(new ErrorHandler(error.message,500));
  }
};

export const logout = async (req, res, next) => {
  try {
    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Strict",
      secure: false,
    }).status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("error in backend logout", error.message);
    next(new ErrorHandler(error.message, 500));
  }
};
