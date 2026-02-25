import ImageKit from "@imagekit/nodejs";
import { private_key } from "../configs/env.js";


const imagekit = new ImageKit({
  privateKey: private_key,
});

async function uploadFile(buffer) {
  const result = await imagekit.client.upload({
    file: buffer,
    fileName: "image.jpg",
  });
  return result;
}


export default uploadFile;