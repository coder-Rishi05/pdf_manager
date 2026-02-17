import express from "express";
import { signup } from "../controller/auth.controller.js";

const authRouter = express.Router();

// register route

authRouter.post("/signup", signup);

export default authRouter;
