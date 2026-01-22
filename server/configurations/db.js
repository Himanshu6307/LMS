import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // const mongoURI = process.env.MONGO_URI;
    
    const connect= await mongoose.connect(process.env.MONGO_URI);

    console.log("✓ MongoDB connected successfully",connect.connection.host);
    return true;
  } catch (error) {
    console.error("✗ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
