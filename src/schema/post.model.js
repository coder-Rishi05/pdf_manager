import mongoose from "mongoose";

const postModel = mongoose.Schema(
  {
    imgUrl: {
      type: String,
    },
    caption: {
      type: String,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("post", postModel);

export default Post;
