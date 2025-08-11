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
exports.getUser = exports.getAllUsers = void 0;
const user_model_1 = require("../users/user.model");
const quiz_service_1 = require("../quiz/quiz.service");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const users = yield user_model_1.User.find();
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const quizResult = yield (0, quiz_service_1.getQuizResult)({ userId: req.params.id });
        res.status(200).json(Object.assign(Object.assign({}, user.toObject()), { quizResult }));
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
