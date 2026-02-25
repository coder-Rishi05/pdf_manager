import User from "../schema/user.model.js";
import Post from "../schema/post.model.js";
import uploadFile from "../services/storage.service.js";

export const loggedInUser = async (req, res) => {
  try {
    const user = req.user;

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

export const createPost = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const file = await uploadFile(req.file.buffer);

    const post = await Post.create({
      imgUrl: file.url,
      caption: req.body.caption,
    });
    return res
      .status(201)
      .json({ message: "post created sucessfully", data: post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.find().select("-_id");
    return res
      .status(200)
      .json({ message: "post fetched sucessfully", data: post });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
