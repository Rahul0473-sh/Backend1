import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret:process.env.API_SECRET,
});

const uploadOnCloudinary = async (localpath) => {
  // when you think that there could be a possiblity of errro apply trycatch
  try {
    if (!localpath) return null;
    const response = cloudinary.uploader.upload(localpath, {
      resource_type: "auto",
    });
    console.log("file is uploadded successfully", (await response).url);
    return response;
  } catch (error) {
    fs.unlinkSync(localpath); //remove the local saved temporary file in the upload
    return null;
  }
};
export default uploadOnCloudinary;

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );
