import User from "../schema/user.model.js";
import bcrypt from "bcrypt";
import { validateSignUpData } from "../utils/validator.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    validateSignUpData(req);
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
      data: { user: newUser.firstName, user: newUser.lastName },
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    validateSignUpData(req);
    const user = await User.findOne({ email }).select("+password");

    const comparepassword = await bcrypt.compare(password, user.password);

    if (!comparepassword) {
      return res.status(403).json({ message: "Invalid access" });
    }
    return res.status(201).json({ message: "login sucessfull" });
  } catch (error) {
    console.log(error);
  }
};


