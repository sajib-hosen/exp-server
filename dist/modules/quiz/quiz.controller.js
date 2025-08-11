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
const quiz_service_1 = require("./quiz.service");
const submitQuizAnswers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stepParam = req.params.step;
        const stepNum = Number(stepParam);
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.id) && !(user === null || user === void 0 ? void 0 : user.email)) {
            return res.status(400).json({ message: "Invalid user" });
        }
        if (![1, 2, 3].includes(stepNum)) {
            return res.status(400).json({ message: "Invalid step parameter" });
        }
        const step = stepNum;
        const data = req.body;
        if (typeof data !== "object" || data === null) {
            return res.status(400).json({ message: "Invalid answers data" });
        }
        // Use userId if available, otherwise email
        let previousResult;
        if (user.id) {
            previousResult = yield (0, quiz_service_1.getQuizResult)({ userId: user.id });
        }
        else if (user.email) {
            previousResult = yield (0, quiz_service_1.getQuizResult)({ email: user.email });
        }
        else {
            return res.status(400).json({ message: "User identification missing" });
        }
        // If there's a previous result, enforce step progression and prevent re-submissions for the same step
        if (previousResult) {
            if (step === previousResult.step) {
                return res.status(400).json({
                    message: `You have already submitted answers for step ${step}.`,
                });
            }
            if (step > 1 && !previousResult.proceedToNextStep) {
                return res.status(403).json({
                    message: `You are not allowed to submit step ${step} yet.`,
                });
            }
        }
        else {
            // If no previous result and user is trying to submit step > 1, reject
            if (step !== 1) {
                return res.status(403).json({
                    message: `You must complete step 1 before proceeding to step ${step}.`,
                });
            }
        }
        // Evaluate answers
        const result = (0, quiz_service_1.evaluateQuiz)(data, step);
        let saveRes;
        if (previousResult && step === previousResult.step + 1) {
            // New step after previous - create a new result
            saveRes = yield (0, quiz_service_1.saveQuizResult)(Object.assign({ userId: user.id, email: user.email, step, answers: data }, result));
        }
        else if (previousResult && step === previousResult.step) {
            // This case is handled above (blocked), but just in case
            return res.status(400).json({
                message: `You have already submitted answers for step ${step}.`,
            });
        }
        else if (previousResult) {
            // Updating current step result (or retry scenario)
            saveRes = yield (0, quiz_service_1.updateQuizResult)(Object.assign({ userId: user.id, email: user.email, step, answers: data }, result));
        }
        else {
            // No previous result, create new for step 1
            saveRes = yield (0, quiz_service_1.saveQuizResult)(Object.assign({ userId: user.id, email: user.email, step, answers: data }, result));
        }
        return res.status(200).json(saveRes);
    }
    catch (err) {
        next(err);
    }
});
exports.submitQuizAnswers = submitQuizAnswers;
const getCurrentStep = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!(user === null || user === void 0 ? void 0 : user.id) && !(user === null || user === void 0 ? void 0 : user.email)) {
            return res.status(400).json({ message: "Invalid user" });
        }
        const previousResult = yield (0, quiz_service_1.getQuizResult)({
            userId: user.id,
            email: user.email,
        });
        if (!previousResult) {
            // No previous result, start at step 1 and eligible
            return res.status(200).json({
                currentStep: 1,
                eligibleToQuiz: true,
                certification: null,
            });
        }
        const currentStep = previousResult.proceedToNextStep && previousResult.step < 3
            ? previousResult.step + 1
            : previousResult.step;
        const eligibleToQuiz = currentStep > previousResult.step || previousResult.step !== currentStep;
        return res.status(200).json({
            currentStep,
            eligibleToQuiz,
            certification: previousResult.certification,
        });
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
