import express from "express"
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { getCurrentUser } from "../controllers/user.controller.js";

const userRouter = express.Router()

userRouter.get("/getcurrentuser",isAuthenticated,getCurrentUser);


export default userRouter;