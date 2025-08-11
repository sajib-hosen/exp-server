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
exports.evaluateQuiz = evaluateQuiz;
const answer_sheet_1 = require("./answer-sheet");
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
function evaluateQuiz(userAnswers, step) {
    // Select answer key arrays based on step
    let relevantAnswers = [];
    if (step === 1) {
        relevantAnswers = [...answer_sheet_1.quizDataA1Answers, ...answer_sheet_1.quizDataA2Answers];
    }
    else if (step === 2) {
        relevantAnswers = [...answer_sheet_1.quizDataB1Answers, ...answer_sheet_1.quizDataB2Answers];
    }
    else if (step === 3) {
        relevantAnswers = [...answer_sheet_1.quizDataC1Answers, ...answer_sheet_1.quizDataC2Answers];
    }
    // Calculate total questions and correct count
    const total = relevantAnswers.length;
    let correctCount = 0;
    for (const { id, correctAnswer } of relevantAnswers) {
        if (userAnswers[id] && userAnswers[id] === correctAnswer) {
            correctCount++;
        }
    }
    const scorePercent = (correctCount / total) * 100;
    // Determine certification & progression
    let certification = "";
    let proceedToNextStep = false;
    if (step === 1) {
        if (scorePercent < 25) {
            certification = "Fail, no retake allowed";
        }
        else if (scorePercent < 50) {
            certification = "A1 certified";
        }
        else if (scorePercent < 75) {
            certification = "A2 certified";
        }
        else {
            certification = "A2 certified + Proceed to Step 2";
            proceedToNextStep = true;
        }
    }
    else if (step === 2) {
        if (scorePercent < 25) {
            certification = "Remain at A2";
        }
        else if (scorePercent < 50) {
            certification = "B1 certified";
        }
        else if (scorePercent < 75) {
            certification = "B2 certified";
        }
        else {
            certification = "B2 certified + Proceed to Step 3";
            proceedToNextStep = true;
        }
    }
    else if (step === 3) {
        if (scorePercent < 25) {
            certification = "Remain at B2";
        }
        else if (scorePercent < 50) {
            certification = "C1 certified";
        }
        else {
            certification = "C2 certified";
        }
    }
    return {
        scorePercent,
        certification,
        proceedToNextStep,
    };
}
