import { Schema, model } from "mongoose";
import { IUserToken } from "./user.interface";

const tokenSchema = new Schema<IUserToken>(
  {
    type: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isUsed: {
      type: Boolean,
      required: true,
      select: false,
    },
    expiresAt: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

export const UserToken = model<IUserToken>("token1", tokenSchema);
