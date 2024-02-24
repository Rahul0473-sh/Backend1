import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import registerUser, {
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);
router.route("/login").post(loginUser);

// Adding middlware for logout
router.route("/logout").post(verifyjwt, logoutUser); // this is a middlware that you can add before the route

export default router;
