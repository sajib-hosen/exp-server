import {
  quizDataA1Answers,
  quizDataA2Answers,
  quizDataB1Answers,
  quizDataB2Answers,
  quizDataC1Answers,
  quizDataC2Answers,
} from "./answer-sheet";
import { QuizResult } from "./quiz.model";
import {
  GetResultInput,
  IQuizResult,
  Result,
  SaveResultInput,
  Step,
  UpdateResultInput,
} from "./quiz.type";

/**
 * Save a quiz result to the database
 */
export const saveQuizResult = async (
  data: SaveResultInput
): Promise<IQuizResult> => {
  const result = new QuizResult({
    userId: data.userId,
    email: data.email,
    step: data.step,
    answers: data.answers,
    scorePercent: data.scorePercent,
    certification: data.certification,
    proceedToNextStep: data.proceedToNextStep,
  });

  return result.save();
};

export const getQuizResult = async (
  query: GetResultInput
): Promise<IQuizResult | null> => {
  const filter: Record<string, any> = {};

  if (query.userId) {
    filter.userId = query.userId;
  } else if (query.email) {
    filter.email = query.email;
  } else {
    throw new Error("Either userId or email must be provided");
  }

  // Find the latest result by createdAt descending
  return QuizResult.findOne(filter).sort({ createdAt: -1 }).exec();
};

export const updateQuizResult = async (
  data: UpdateResultInput
): Promise<IQuizResult | null> => {
  const filter: Record<string, any> = {};

  if (data.userId) {
    filter.userId = data.userId;
  } else if (data.email) {
    filter.email = data.email;
  } else {
    throw new Error("Either userId or email must be provided");
  }

  // Find the latest result and update it with new data
  return QuizResult.findOneAndUpdate(
    filter,
    {
      step: data.step,
      answers: data.answers,
      certification: data.certification,
      proceedToNextStep: data.proceedToNextStep,
      scorePercent: data.scorePercent,
      updatedAt: new Date(),
    },
    { new: true }
  ).exec();
};

export function evaluateQuiz(
  userAnswers: Record<string, string>,
  step: Step
): Result {
  // Select answer key arrays based on step
  let relevantAnswers: { id: string; correctAnswer: string }[] = [];

  if (step === 1) {
    relevantAnswers = [...quizDataA1Answers, ...quizDataA2Answers];
  } else if (step === 2) {
    relevantAnswers = [...quizDataB1Answers, ...quizDataB2Answers];
  } else if (step === 3) {
    relevantAnswers = [...quizDataC1Answers, ...quizDataC2Answers];
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
    } else if (scorePercent < 50) {
      certification = "A1 certified";
    } else if (scorePercent < 75) {
      certification = "A2 certified";
    } else {
      certification = "A2 certified + Proceed to Step 2";
      proceedToNextStep = true;
    }
  } else if (step === 2) {
    if (scorePercent < 25) {
      certification = "Remain at A2";
    } else if (scorePercent < 50) {
      certification = "B1 certified";
    } else if (scorePercent < 75) {
      certification = "B2 certified";
    } else {
      certification = "B2 certified + Proceed to Step 3";
      proceedToNextStep = true;
    }
  } else if (step === 3) {
    if (scorePercent < 25) {
      certification = "Remain at B2";
    } else if (scorePercent < 50) {
      certification = "C1 certified";
    } else {
      certification = "C2 certified";
    }
  }

  return {
    scorePercent,
    certification,
    proceedToNextStep,
  };
}
