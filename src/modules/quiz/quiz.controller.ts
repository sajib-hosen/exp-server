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

export const submitQuizAnswers: RequestHandler = async (req, res, next) => {
  try {
    const result = await getAllActiveUsers();

    res.status(200).json({
      success: true,
      message: "Retrieved all active users",
      data: result,
    });
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
