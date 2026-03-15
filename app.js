import express from "express";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import postRouter from "./src/routes/post.route.js";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import "./src/auth/google.js"; // ✅ Google strategy load karna zaroori hai!

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// ✅ Session pehle, phir passport
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: false, // ✅ false better hai production ke liye
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/post", postRouter);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    res.redirect("http://localhost:5173/dashboard");
  }
);