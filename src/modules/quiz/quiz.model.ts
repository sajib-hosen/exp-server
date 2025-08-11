import { Schema, model, Document, Types } from "mongoose";
import { IQuizResult } from "./quiz.type";

const quizResultSchema = new Schema<IQuizResult>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    step: {
      type: Number,
      required: true,
      enum: [1, 2, 3],
    },
    answers: {
      type: Map,
      of: String,
      required: true,
    },
    scorePercent: {
      type: Number,
      required: true,
    },
    certification: {
      type: String,
      required: true,
    },
    proceedToNextStep: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const QuizResult = model<IQuizResult>("QuizResult", quizResultSchema);
