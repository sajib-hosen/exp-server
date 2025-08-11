"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("./user.controller"));
// import auth from "../../middlewares/auth";
const router = express_1.default.Router();
router.get("/active-users", user_controller_1.default.activeUsers);
// router.get("/all-users", userController.allUsers);
// router.get(
//   "/users-with-donation-history",
//   userController.usersWithDonationHistory
// );
// router.get("/single-user/:id", userController.getSingleUser);
// router.post("/user-registration", userController.createUser);
// router.post("/forgot-password", auth(), userController.changePassword);
// router.patch("/:id", userController.updateUser);
// //router.patch("/make-connection", auth(), userController.makeConnection);
// router.patch("/make-connection/:id", auth(), userController.makeConnection);
// router.get("/my-posts", auth(), userController.getMyPost);
// router.get("/requested-donor/:id", auth(), userController.getRequestedDonor);
// router.get("/my-donation-history", auth(), userController.getMyDonationHistory);
// router.get("/connected-users", auth(), userController.connectedUsers);
// router.patch("/point-reduction/:name", auth(), userController.pointReduction);
// router.post("/verify-otp", auth(), userController.verifyOtp);
// router.post("/reset-password", auth(), userController.resetPassword);
// router.put("/update-last-seen", auth(), userController.updateLastSeen);
exports.userRouter = router;
