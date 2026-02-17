import User from "../schema/user.model.js";
import bcrypt from "bcrypt";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(404).json({ message: "All feilds are necesaary" });
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await  User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({
        message: "user created sucessfully",
        data: { user: newUser.firstName, user: newUser.lastName },
      });
  } catch (error) {
    console.log(error);
    return res.status(501).json({ message: "server error" });
  }
};
