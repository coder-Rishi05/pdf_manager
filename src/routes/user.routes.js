import express from "express";
import { loggedInUser } from "../controller/user.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const userRouter = express.Router();

userRouter.get("/data", authMiddleware, loggedInUser);

export default userRouter;
