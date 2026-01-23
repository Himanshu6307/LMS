import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      maxlength: [100, "Email cannot exceed 100 characters"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [5, "Password must be at least 5 characters"],
    },

    photoUrl: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: {
        values: ["student", "educator"],
        message: "Please select a valid role",
      },
      required: [true, "Please provide a role"],
    },

    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },

    ],

    isVerified: {
      type: Boolean,
      default: false
    },

    otpCode: {
      type: String,
      default: null
    },

    expireAt: {
      type: Date,
      default: null
    }

  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
