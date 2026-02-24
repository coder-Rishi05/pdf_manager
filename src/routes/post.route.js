import { Router } from "express";
import { createPost, getPost } from "../controller/user.controller.js";

const postRouter = Router();

postRouter.post("/createPost", createPost);

postRouter.get("/getPost", getPost);

export default postRouter;
