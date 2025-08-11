"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const quiz_controller_1 = require("./quiz.controller");
const router = express_1.default.Router();
router.post("/:step", auth_1.accessTokenGuard, quiz_controller_1.submitQuizAnswers);
router.get("/current-step", auth_1.accessTokenGuard, quiz_controller_1.getCurrentStep);
exports.quizRouter = router;
