import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: "student" | "admin" | "supervisor";
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
}

export interface IUserToken extends Document {
  type: string;
  email: string;
  isUsed: boolean;
  tokenId: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
