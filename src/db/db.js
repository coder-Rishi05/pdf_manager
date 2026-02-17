import mongoose from "mongoose";
import { MONGODB_URI } from "../configs/env.js";

export const connectDb = async () => {
  const connect = await mongoose.connect(MONGODB_URI);
  
};
