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
exports.updateQuizResult = exports.getQuizResult = exports.saveQuizResult = void 0;
const quiz_model_1 = require("./quiz.model");
/**
 * Save a quiz result to the database
 */
const saveQuizResult = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = new quiz_model_1.QuizResult({
        userId: data.userId,
        email: data.email,
        step: data.step,
        answers: data.answers,
        scorePercent: data.scorePercent,
        certification: data.certification,
        proceedToNextStep: data.proceedToNextStep,
    });
    return result.save();
});
exports.saveQuizResult = saveQuizResult;
const getQuizResult = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query.userId) {
        filter.userId = query.userId;
    }
    else if (query.email) {
        filter.email = query.email;
    }
    else {
        throw new Error("Either userId or email must be provided");
    }
    // Find the latest result by createdAt descending
    return quiz_model_1.QuizResult.findOne(filter).sort({ createdAt: -1 }).exec();
});
exports.getQuizResult = getQuizResult;
const updateQuizResult = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (data.userId) {
        filter.userId = data.userId;
    }
    else if (data.email) {
        filter.email = data.email;
    }
    else {
        throw new Error("Either userId or email must be provided");
    }
    // Find the latest result and update it with new data
    return quiz_model_1.QuizResult.findOneAndUpdate(filter, {
        step: data.step,
        answers: data.answers,
        certification: data.certification,
        proceedToNextStep: data.proceedToNextStep,
        scorePercent: data.scorePercent,
        updatedAt: new Date(),
    }, { new: true }).exec();
});
exports.updateQuizResult = updateQuizResult;
