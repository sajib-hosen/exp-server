import express from "express";
import { activeUsers, logoutUser } from "./user.controller";
// import userController from "./user.controller";
// import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/active-users", activeUsers);

// router.post("/register", asyncHandler(registerUser));

// router.post("/verify-email/:tokenId", asyncHandler(verifyEmail));

// router.post("/login", asyncHandler(loginUser));

// router.get("/me", asyncHandler(accessTokenGuard), asyncHandler(getMe));

// router.post("/forgot-password", asyncHandler(forgotPassword));

// router.post("/reset-password/:tokenId", asyncHandler(resetPassword));

// router.get(
//   "/refresh-token",
//   asyncHandler(refreshTokenGuard),
//   asyncHandler(refreshAccessToken)
// );

router.post("/logout", logoutUser);

// router.put("/update-last-seen", auth(), userController.updateLastSeen);

export const userRouter = router;
