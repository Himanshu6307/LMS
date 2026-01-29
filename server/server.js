import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./configurations/db.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import courseRouter from "./routes/course.route.js";
import lectureRouter from "./routes/lecture.route.js";


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/lecture",lectureRouter);


// Start server
app.listen(PORT, async() => {
  console.log(`Server running on port ${PORT}`);
  await connectDB()
});