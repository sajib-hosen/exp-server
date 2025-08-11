import { RequestHandler } from "express";
import {
  createUser,
  createUserToken,
  findUserByEmail,
  getAllActiveUsers,
} from "../users/user.service";
import { sendEmail } from "../../util/send-email";
import { APP_NAME } from "../../util/constant";
import { verificationEmailHTML } from "../../util/verify-email-html";
import {
  evaluateQuiz,
  getQuizResult,
  saveQuizResult,
  updateQuizResult,
} from "./quiz.service";
import { Step } from "./quiz.type";

export const submitQuizAnswers: RequestHandler = async (req, res, next) => {
  try {
    const stepParam = req.params.step;
    const stepNum = Number(stepParam);

    const user = (req as any).user;

    if (!user?.id && !user?.email) {
      return res.status(400).json({ message: "Invalid user" });
    }

    if (![1, 2, 3].includes(stepNum)) {
      return res.status(400).json({ message: "Invalid step parameter" });
    }
    const step = stepNum as Step;

    const data = req.body;
    if (typeof data !== "object" || data === null) {
      return res.status(400).json({ message: "Invalid answers data" });
    }

    // Use userId if available, otherwise email
    let previousResult;
    if (user.id) {
      previousResult = await getQuizResult({ userId: user.id });
    } else if (user.email) {
      previousResult = await getQuizResult({ email: user.email });
    } else {
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
    } else {
      // If no previous result and user is trying to submit step > 1, reject
      if (step !== 1) {
        return res.status(403).json({
          message: `You must complete step 1 before proceeding to step ${step}.`,
        });
      }
    }

    // Evaluate answers
    const result = evaluateQuiz(data, step);

    let saveRes;
    if (previousResult && step === previousResult.step + 1) {
      // New step after previous - create a new result
      saveRes = await saveQuizResult({
        userId: user.id,
        email: user.email,
        step,
        answers: data,
        ...result,
      });
    } else if (previousResult && step === previousResult.step) {
      // This case is handled above (blocked), but just in case
      return res.status(400).json({
        message: `You have already submitted answers for step ${step}.`,
      });
    } else if (previousResult) {
      // Updating current step result (or retry scenario)
      saveRes = await updateQuizResult({
        userId: user.id,
        email: user.email,
        step,
        answers: data,
        ...result,
      });
    } else {
      // No previous result, create new for step 1
      saveRes = await saveQuizResult({
        userId: user.id,
        email: user.email,
        step,
        answers: data,
        ...result,
      });
    }

    return res.status(200).json(saveRes);
  } catch (err) {
    next(err);
  }
};

export const getCurrentStep: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    await createUser({ name, email, password }); // Create new user in the database

    const userToken = await createUserToken({
      type: "verify-email",
      email,
      isUsed: false,
    });

    const newLink = `${process.env.CLIENT_BASE_URL}/verify-email/${userToken.id}`; // Generate verification link

    await sendEmail(
      email, // Recipient email
      `Confirm your email address for ${APP_NAME}`, // Email subject
      verificationEmailHTML(name, newLink) // HTML email content
    );

    res.status(201).json({ message: "User created successfully" }); // Send success response
  } catch (error) {
    console.log("register error", error);
    res.status(500).json({ message: "Internal server error" }); // Handle unexpected errors
  }
};

export const logoutUser: RequestHandler = async (req, res, next) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
