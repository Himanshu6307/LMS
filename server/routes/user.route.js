import express from "express"
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";
import { forgotPassController, setPassword, verifyOtp } from "../controllers/forgotpass.controller.js";

const userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuthenticated,getCurrentUser);
userRouter.post('/forgotpass',forgotPassController);
userRouter.post('/verifyotp',verifyOtp);
userRouter.post('/setpassword',setPassword);

export default userRouter;