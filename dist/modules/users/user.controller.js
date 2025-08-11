"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = exports.resetPassword = exports.forgotPassword = exports.getMe = exports.loginUser = exports.verifyEmail = exports.logoutUser = exports.registerUser = exports.activeUsers = void 0;
const user_service_1 = require("./user.service");
// import userService from "./user.service";
// import { sendResponse } from "../../util/sendResponse";
// import { User } from "./user.model";
const activeUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_service_1.getAllActiveUsers)();
        res.status(200).json({
            success: true,
            message: "Retrieved all active users",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.activeUsers = activeUsers;
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield (0, user_service_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        yield (0, user_service_1.createUser)({ name, email, password }); // Create new user in the database
        // const userToken = await createUserToken({
        //   type: "verify-email",
        //   email,
        //   isUsed: false,
        // });
        // const newLink = `${process.env.CLIENT_BASE_URL}/verify-email/${userToken.id}`; // Generate verification link
        // await sendEmail(
        //   email, // Recipient email
        //   `Confirm your email address for ${APP_NAME}`, // Email subject
        //   verificationEmailHTML(name, newLink) // HTML email content
        // );
        res.status(201).json({ message: "User created successfully" }); // Send success response
    }
    catch (error) {
        console.log("register error", error);
        res.status(500).json({ message: "Internal server error" }); // Handle unexpected errors
    }
});
exports.registerUser = registerUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({ message: "Logged out successfully" });
    }
    catch (err) {
        next(err);
    }
});
exports.logoutUser = logoutUser;
const verifyEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     const { tokenId } = req.params;
        //     const userToken = await findUserTokenById(tokenId);
        //     if (!userToken) {
        //       return res
        //         .status(400)
        //         .json({ message: "Invalid or expired verification link" });
        //     }
        //     if (userToken.isUsed || userToken.type !== "verify-email") {
        //       return res.status(400).json({ message: "Invalid or already used token" });
        //     }
        //     //Find the user by email from token
        //     const user = await findUserByEmail(userToken.email);
        //     if (!user) {
        //       return res.status(404).json({ message: "User not found" });
        //     }
        //     await verifyUserEmail(user.id);
        //     await updateUserToken(userToken.id, { isUsed: true });
        //     const { accessToken, refreshToken } = generateTokens({
        //       id: user._id,
        //       email: user.email,
        //       role: user.role,
        //     });
        //     // Set refresh token as HTTP-only cookie
        //     res.cookie("refreshToken", refreshToken, {
        //       httpOnly: true, // Cannot be accessed via JavaScript
        //       secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        //       sameSite: "strict", // CSRF protection
        //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //       path: "/",
        //     });
        //     res.status(200).json({ accessToken });
        res.status(200).json({
            message: "test message",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.verifyEmail = verifyEmail;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     const { email, password } = req.body; // Get credentials from request
        //     const user = await findUserByEmail(email); // Find user in DB
        //     if (!user || !password) {
        //       return res.status(401).json({ message: "Invalid credentials" });
        //     }
        //     if (!user.isVerified)
        //       return res.status(401).json({ message: "User not verified" });
        //     // Validate password
        //     const isPasswordValid =
        //       user.password && (await bcrypt.compare(password, user.password));
        //     if (!isPasswordValid) {
        //       return res.status(401).json({ message: "Invalid credentials" });
        //     }
        //     const { accessToken, refreshToken } = generateTokens({
        //       id: user._id,
        //       email: user.email,
        //       role: user.role,
        //     });
        //     // Set refresh token as HTTP-only cookie
        //     res.cookie("refreshToken", refreshToken, {
        //       httpOnly: true, // Cannot be accessed via JavaScript
        //       secure: process.env.NODE_ENV === "production", // HTTPS in production
        //       sameSite: "strict", // CSRF protection
        //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //       path: "/",
        //     });
        //     // Send access token to client
        //     res.status(200).json({ accessToken });
        res.status(200).json({
            message: "test message",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.loginUser = loginUser;
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     // Extract user id from req.user (set by your auth middleware)
        //     const reqUser = (req as any).user as IUser;
        //     if (!reqUser?.id) {
        //       return res.status(401).json({ message: "Unauthorized" });
        //     }
        //     // Fetch fresh user data from DB by ID
        //     const user = await findUserById(reqUser.id);
        //     if (!user) {
        //       return res.status(404).json({ message: "User not found" });
        //     }
        //     // Optionally remove sensitive fields before sending, like password
        //     const { password, ...safeUser } = user.toObject();
        //     res.status(200).json(safeUser);
        res.status(200).json({
            message: "test message",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.getMe = getMe;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     const { email } = req.body;
        //     const user = await findUserByEmail(email);
        //     if (!user) {
        //       return res.status(200).json({
        //         message: "If a matching account exists, a reset link has been sent.",
        //       });
        //     }
        //     if (!user.isVerified)
        //       return res.status(401).json({ message: "User not verified" });
        //     const resetToken = await createUserToken({
        //       type: "reset-password",
        //       email,
        //       isUsed: false,
        //       expiresAt: EXPIRY_STAMP,
        //     });
        //     const resetLink = `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken.id}`;
        //     await sendEmail(
        //       email,
        //       `Reset your password for ${APP_NAME}`,
        //       resetPasswordEmailHTML(user.name, resetLink)
        //     );
        res.status(200).json({
            message: "If a matching account exists, a reset link has been sent.",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     const { tokenId } = req.params;
        //     const { newPassword } = req.body;
        //     const userToken = await findUserTokenById(tokenId);
        //     if (!userToken || userToken.isUsed || userToken.type !== "reset-password") {
        //       return res
        //         .status(400)
        //         .json({ message: "Invalid or expired reset token." });
        //     }
        //     const user = await findUserByEmail(userToken.email);
        //     if (!user) {
        //       return res.status(404).json({ message: "User not found." });
        //     }
        //     const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUND);
        //     await user.updateOne({ password: hashedPassword });
        //     await updateUserToken(userToken.id, { isUsed: true });
        res.status(200).json({ message: "Password has been reset successfully." });
    }
    catch (err) {
        next(err);
    }
});
exports.resetPassword = resetPassword;
const refreshAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //     // The refreshTokenGuard middleware has verified the refresh token and attached user info to req.user
        //     const user = (req as any).user;
        //     if (!user) {
        //       return res.status(401).json({ message: "Unauthorized" });
        //     }
        //     // Generate new access and refresh tokens
        //     const { accessToken, refreshToken } = generateTokens({
        //       id: user.id,
        //       email: user.email,
        //       role: user.role,
        //     });
        //     // Set new refresh token cookie
        //     res.cookie("refreshToken", refreshToken, {
        //       httpOnly: true,
        //       secure: process.env.NODE_ENV === "production",
        //       sameSite: "strict",
        //       maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        //     });
        //     // Send new access token in response
        //     res.status(200).json({ accessToken });
        res.status(200).json({
            message: "test message",
        });
    }
    catch (err) {
        next(err);
    }
});
exports.refreshAccessToken = refreshAccessToken;
