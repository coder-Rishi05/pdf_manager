import express from "express";
import { Login, logout, signup,guestUser } from "../controller/auth.controller.js";

const authRouter = express.Router();

// register route

authRouter.post("/signup", signup);
authRouter.post("/login", Login);
authRouter.post("/logout", logout);

authRouter.post("/guestAccount",guestUser);

export default authRouter;
