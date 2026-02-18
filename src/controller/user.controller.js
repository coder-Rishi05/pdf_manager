import User from "../schema/user.model.js";

export const loggedInUser = async (req, res) => {
  try {
    const { id } = req.user.id;
    console.log(id)

    const loggedIn = await User.findOne({ _id: id });

    if (!loggedIn) {
      return res.status(404).json({ message: "User not found " });
    }

    return res
      .status(201)
      .json({ message: "Logged in user is", name: loggedIn.name });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "server error" });
  }
};
