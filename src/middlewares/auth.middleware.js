import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.modal.js";

export const verifyjwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");
    if (!token) {
      throw new ApiError(404, "Unauthorize request");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN); // it will give you decoded infromation
    const user = await User.findById(user._id).select("-password refreshToken");
    if (!user) {
      throw new ApiError(404, "Error authorization");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid access token");
  }
});
export {};
