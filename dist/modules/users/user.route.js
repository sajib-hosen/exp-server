"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
// import userController from "./user.controller";
// import auth from "../../middlewares/auth";
const router = express_1.default.Router();
router.get("/active-users", user_controller_1.activeUsers);
router.post("/register", user_controller_1.registerUser);
router.post("/verify-email/:tokenId", user_controller_1.verifyEmail);
router.post("/login", user_controller_1.loginUser);
// router.get("/me", asyncHandler(accessTokenGuard), asyncHandler(getMe));
router.post("/forgot-password", user_controller_1.forgotPassword);
router.post("/reset-password/:tokenId", user_controller_1.resetPassword);
// router.get(
//   "/refresh-token",
//   asyncHandler(refreshTokenGuard),
//   asyncHandler(refreshAccessToken)
// );
router.post("/logout", user_controller_1.logoutUser);
// router.put("/update-last-seen", auth(), userController.updateLastSeen);
exports.userRouter = router;
