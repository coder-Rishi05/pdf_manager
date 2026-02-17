import "dotenv/config";
import { app } from "../app.js";
import { port } from "./configs/env.js";
import { connectDb } from "./db/db.js";

connectDb()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server running at port : ${port}`);
    });
  })
  .catch((err) => {
    console.log("error connecting database", err);
  });
