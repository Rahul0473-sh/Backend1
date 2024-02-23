import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.modal.js";
import uploadOnCloudinary from "../utils/Cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password, fullname } = req.body; // mean  lot of things stored in req.body
  console.log("email", email); // you check this from postman

  if ([email, username, password, fullname].some((field) => {})) {
    throw new ApiError(400, "All fields are requried");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }], // This is the syntax where you can apply or opereations in multiple operands
  });
  if (existedUser) throw new ApiError(409, "user already exits");

  const avatarLocalpath = req.files.avatar[0].path;
  // const coverLocalpath = req.files[0].coverImage.path;
  let coverLocalpath="";
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverLocalpath = req.files.coverImage[0].path;
  }
  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar isn't availbale");
  }
  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const coverImage = await uploadOnCloudinary(coverLocalpath);
  if (!avatar) {
    throw new ApiError(400, "Avatare is required");
  }

  const user = User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || " ",
    email,
    password,
    username: username.toLowerCase(),
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) throw new ApiError(501, "server is'nt working");
  return res
    .status(201)
    .json(ApiResponse(201, "User registration succefully90"));
});

const genrateAcessTokenandRefreshToken = async (userid) => {
  const user = User.findById(userid);
  const accessToken = user.genrateAcessToken();
  const refreshToken = user.genrateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "User,Email required");
  }
  const user = User.findOne({ $or: [{ email }, { username }] });
  if (!user) throw new ApiError(404, "User not registred yet");

  await user.isPasswordCorrect(password);
  const { accessToken, refreshToken } = await genrateAcessTokenandRefreshToken(
    user._id
  );
  const loggedIn = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httponly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedIn,
          accessToken,
          refreshToken,
        },
        "user Logged In successfuly"
      )
    );
});
// const registerUser = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: "ok" });
// });
export default registerUser;

