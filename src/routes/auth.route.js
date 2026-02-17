import express from "express";
import { Login, signup } from "../controller/auth.controller.js";

const authRouter = express.Router();

// register route

authRouter.post("/signup", signup);
authRouter.post("/login", Login);

export default authRouter;
