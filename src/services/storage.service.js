import ImageKit from "@imagekit/nodejs";
import { private_key } from "../configs/env.js";

const imagekit = new ImageKit({
  privateKey: private_key,
});

async function uploadFile(buffer) {
  const result = await imagekit.files.upload({
    file: buffer.toString("base64"),
    fileName: "image.jpg",
  });
  return result;
}

export default uploadFile;
