import mongoose from "mongoose";

const postModel = mongoose.Schema(
  {
    imgUrl: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Post =  mongoose.model("post", postModel);

export default Post;
