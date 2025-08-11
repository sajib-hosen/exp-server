import express from "express";
import {
  activeUsers,
  forgotPassword,
  getMe,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from "./user.controller";
import auth, { accessTokenGuard } from "../../middlewares/auth";

const router = express.Router();

router.get("/active-users", activeUsers);

router.post("/register", registerUser);

router.post("/verify-email/:tokenId", verifyEmail);

router.post("/login", loginUser);

router.get("/me", accessTokenGuard, getMe);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:tokenId", resetPassword);

// router.get(
//   "/refresh-token",
//   asyncHandler(refreshTokenGuard),
//   asyncHandler(refreshAccessToken)
// );

router.post("/logout", logoutUser);

export const userRouter = router;
