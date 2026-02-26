import express from "express";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import postRouter from "./src/routes/post.route.js";
import cors from "cors";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/post", postRouter);
