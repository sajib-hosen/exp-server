import { RequestHandler } from "express";
import {
  createUserToken,
  findUserByEmail,
  findUserById,
} from "../users/user.service";
import { EXPIRY_STAMP } from "../../util/expiry-stamp";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { getQuizResult } from "../quiz/quiz.service";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const quizResult = await getQuizResult({ userId: req.params.id });

    res.status(200).json({
      ...user.toObject(),
      quizResult,
    });
  } catch (err) {
    next(err);
  }
};
