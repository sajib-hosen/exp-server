import express from "express";
import {
  activeUsers,
  forgotPassword,
  getMe,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resetPassword,
  verifyEmail,
} from "./user.controller";
import { accessTokenGuard, refreshTokenGuard } from "../../middlewares/auth";

const router = express.Router();

// router.get("/active-users", activeUsers);

router.post("/register", registerUser);

router.post("/verify-email/:tokenId", verifyEmail);

router.post("/login", loginUser);

router.get("/me", accessTokenGuard, getMe);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:tokenId", resetPassword);

router.get("/refresh-token", refreshTokenGuard, refreshAccessToken);

router.post("/logout", logoutUser);

export const userRouter = router;
