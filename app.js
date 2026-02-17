import express from "express";
import authRouter from "./src/routes/auth.route.js";

export const app = express();

app.use(express.json());

app.use("/api/auth/", authRouter);
