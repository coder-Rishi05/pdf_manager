import jwt from "jsonwebtoken";
import { secretKey } from "../configs/env.js";
import User from "../schema/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = await jwt.verify(token, secretKey);
    // extract info
    const { userId } = decoded;
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
