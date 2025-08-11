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
exports.logoutUser = exports.getCurrentStep = exports.submitQuizAnswers = void 0;
const user_service_1 = require("../users/user.service");
const send_email_1 = require("../../util/send-email");
const constant_1 = require("../../util/constant");
const verify_email_html_1 = require("../../util/verify-email-html");
const submitQuizAnswers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.submitQuizAnswers = submitQuizAnswers;
const getCurrentStep = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        const existingUser = yield (0, user_service_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        yield (0, user_service_1.createUser)({ name, email, password }); // Create new user in the database
        const userToken = yield (0, user_service_1.createUserToken)({
            type: "verify-email",
            email,
            isUsed: false,
        });
        const newLink = `${process.env.CLIENT_BASE_URL}/verify-email/${userToken.id}`; // Generate verification link
        yield (0, send_email_1.sendEmail)(email, // Recipient email
        `Confirm your email address for ${constant_1.APP_NAME}`, // Email subject
        (0, verify_email_html_1.verificationEmailHTML)(name, newLink) // HTML email content
        );
        res.status(201).json({ message: "User created successfully" }); // Send success response
    }
    catch (error) {
        console.log("register error", error);
        res.status(500).json({ message: "Internal server error" }); // Handle unexpected errors
    }
});
exports.getCurrentStep = getCurrentStep;
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
