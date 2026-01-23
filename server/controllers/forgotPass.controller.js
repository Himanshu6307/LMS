import  { ErrorHandler } from "../utils/error.js";
import { sendEmail } from "../utils/sentEmail.js";
import generateOTP from "../utils/generateOtp.js";
import bcrypt from "bcryptjs";
import { User } from "../model/user.model.js";

export const forgotPassController = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new ErrorHandler("Email is required", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Forgot password only for verified users
    if (user.isVerified) {
      return next(new ErrorHandler("User is not verified", 400));
    }

    // Generate OTP
    const otp = generateOTP();
    if (!otp) {
      return next(new ErrorHandler("OTP generation error", 500));
    }

    // Send Email
    await sendEmail(email, "OTP Verification", otp);

    // Save OTP
    user.otpCode = otp;
    user.expireAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP email sent successfully",
    });

  } catch (error) {
    console.log("Error:", error.message);
    next(error);
  }
};


export const verifyOtp = async (req, res, next) => {

  try {
    const {email, otp } = req.body;

    if (!email || !otp) {
      return next(new ErrorHandler("Email and OTP are required", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    // Only unverified users should enter OTP
    if (!user.otpCode) {
      return next(new ErrorHandler("No OTP generated for this account", 400));
    }
    // OTP expires check
    if (user.expireAt < Date.now()) {
      return next(new ErrorHandler("OTP expired, please request a new one", 400));
    }


    // Check OTP
    if (user.otpCode !== otp) {
      return next(new ErrorHandler("Invalid OTP, please try again", 400));
    }

    user.otpCode = null;
    user.expireAt = null;
    user.isVerified = true;

    await user.save();

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.log("Error:", error.message);
    next(error);
  }
};

export const setPassword = async (req, res, next) => {

  try {
    const { email,password,confirmPassword } = req.body;

    if (!email || !password || !confirmPassword ) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    if(password!=confirmPassword){
        return next(new ErrorHandler("Both password are not equal please check it carefully", 400));
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }


    // Check OTP
    if (!user.isVerified) {
      return next(new ErrorHandler("You are not verified", 400));
    }
     
    //set password
    const hashedPassword = await bcrypt.hash(password,10)
    user.password = hashedPassword;
    user.isVerified = false;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password set successfully ,Please login!",
    });

  } catch (error) {
    console.log("Error:", error.message);
    next(error);
  }
};
