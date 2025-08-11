import { Types } from "mongoose";

export interface AnswerType {
  id: string;
  correctAnswer: string;
}

export interface IQuizResult extends Document {
  userId?: Types.ObjectId; // optional, if you track users
  email: string;
  step: 1 | 2 | 3;
  answers: Record<string, string>; // e.g. { q001: "Answer text", ... }
  scorePercent: number;
  certification: string;
  proceedToNextStep: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SaveResultInput {
  userId?: string; // optional if you track users
  email?: string;
  step: 1 | 2 | 3;
  answers: Record<string, string>;
  scorePercent: number;
  certification: string;
  proceedToNextStep: boolean;
}

export interface GetResultInput {
  userId?: string;
  email?: string;
}

export interface UpdateResultInput {
  userId?: string;
  email?: string;
  step: 1 | 2 | 3;
  answers: Record<string, string>;
  certification: string;
  proceedToNextStep: boolean;
  scorePercent: number;
}

export type Step = 1 | 2 | 3;

export interface Result {
  scorePercent: number;
  certification: string;
  proceedToNextStep: boolean;
}
