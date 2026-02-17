import "dotenv/config";
import { app } from "../app.js";
import { port } from "./configs/env.js";


app.listen(port, () => {
  console.log(`server running at port : ${port}`);
});
