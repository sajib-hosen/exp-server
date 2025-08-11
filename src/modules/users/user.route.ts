import express from "express";
import {
  activeUsers,
  forgotPassword,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  verifyEmail,
} from "./user.controller";
// import userController from "./user.controller";
// import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/active-users", activeUsers);

router.post("/register", registerUser);

router.post("/verify-email/:tokenId", verifyEmail);

router.post("/login", loginUser);

// router.get("/me", asyncHandler(accessTokenGuard), asyncHandler(getMe));

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:tokenId", resetPassword);

// router.get(
//   "/refresh-token",
//   asyncHandler(refreshTokenGuard),
//   asyncHandler(refreshAccessToken)
// );

router.post("/logout", logoutUser);

// router.put("/update-last-seen", auth(), userController.updateLastSeen);

export const userRouter = router;
