import { Router } from "express";
import { createPost, getPost } from "../controller/user.controller.js";

import multer from "multer";
import { authMiddleware } from "../middleware/authMiddleware.js";

const postRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createPost", authMiddleware, upload.single("imgUrl"), createPost);

postRouter.get("/feed", getPost);


export default postRouter;
