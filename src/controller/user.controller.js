import User from "../schema/user.model.js";

export const loggedInUser = async (req, res) => {
  try {
    const user = req.user;

    console.log("user from loggedInUSer");

    const loggedIn = await User.findOne({ _id: user._id });

    if (!loggedIn) {
      return res.status(404).json({ message: "User not found " });
    }

    return res.status(201).json({
      message: "Logged in user is",
      user: { name: loggedIn.firstName, lastName: loggedIn.lastName },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
