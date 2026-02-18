import User from "../schema/user.model.js";
import bcrypt from "bcrypt";
import { validateLoginData, validateSignUpData } from "../utils/validator.js";
import jwt from "jsonwebtoken";
import { secretKey } from "../configs/env.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    validateSignUpData(req);

    const existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(409).json({ message: "User already exist" });
    }

    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "user created sucessfully",
      data: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    validateLoginData(req);
    const user = await User.findOne({ email }).select("+password");

    // check if user exist or not

    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const validUser = await bcrypt.compare(password, user.password);

    if (!validUser) {
      return res.status(403).json({ message: "Invalid credentials" });
    }

    // check active or not

    if(!user.isActive){
      return res.status(401).json("User blocked")
    }

    //    setting up jwt token
    const token = jwt.sign({ userId: user._id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });

    // setting up cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "login sucessfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("server error", error);
    res.status(500).json({ message: "server error", error });
  }
};
