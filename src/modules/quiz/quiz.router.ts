import express from "express";
import { accessTokenGuard } from "../../middlewares/auth";
import { getCurrentStep, submitQuizAnswers } from "./quiz.controller";

const router = express.Router();

router.post("/:step", accessTokenGuard, submitQuizAnswers);

router.get("/current-step", accessTokenGuard, getCurrentStep);

export const quizRouter = router;
