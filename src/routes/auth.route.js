import express from "express";
import passport from "passport"; // ✅ passport import karo
import {
  Login,
  logout,
  signup,
  guestUser,
} from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", Login);
authRouter.post("/logout", logout);
authRouter.post("/guestAccount", guestUser);

// ✅ Step 1: Google redirect
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }) // ✅ "email" string hata diya
);

// ✅ Step 2: Google callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login", // ✅ Frontend URL
    session: true,
  }),
  (req, res) => {
    // ✅ JWT approach (recommended) ya session dono kaam karenge
    res.redirect("http://localhost:5173/dashboard");
  }
);

// ✅ Step 3: Profile check
authRouter.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ message: "Not logged in" });
  res.json({ user: req.user }); // ✅ res.send() fix kiya
});

// ✅ Step 4: Logout
authRouter.get("/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("http://localhost:5173/login");
  });
});

export default authRouter;