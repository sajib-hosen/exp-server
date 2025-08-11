import mongoose from "mongoose";
import config from "../../config";
// import AppError from "../../errors/AppError";
import { sendVerificationEmail } from "../../util/emailService";
import { UserToken } from "./token.model";
import { IUser, IUserToken } from "./user.interface";
// import { BloodPost } from "../bloodPost/bloodPost.model";
// import { DonorRequest } from "../donorRequest/donorRequest.model";
// import { TUser } from "./user.interface";
import { User } from "./user.model";
import jwt, { JwtPayload } from "jsonwebtoken";
// import bcrypt from "bcrypt";

// const createUserRegistration = async (payload: TUser) => {
//   const isUserAlreadyExist = await User.findOne({ name: payload.name });
//   if (isUserAlreadyExist) {
//     throw new Error("User is already exists");
//   }

//   const result = await User.create(payload);

//   if (!result) {
//     throw new Error("Failed to register new user");
//   }
//   // Generate email verification token
//   const token = jwt.sign(
//     { id: result._id },
//     config.jwt_access_secret as string,
//     { expiresIn: "1h" }
//   );

//   const verificationLink = `${config.frontend_url}/verify-email?token=${token}`;

//   const html = `
//     <div style="font-family: sans-serif; text-align: center;">
//       <h3>Welcome to Blood Bank</h3>
//       <p>Please verify your email by clicking the link below:</p>
//       <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #d62828; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Verify Email</a>
//       </div>
//     `;
//   // Send the email
//   await sendVerificationEmail(result.email, html);

//   return result;
// };

export const getAllActiveUsers = async () => {
  const result = await User.find({});

  if (!result) {
    throw new Error("Failed to retrieve all active users");
  }

  return result;
};

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData);
  return user.save();
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email }).select("+password");
};

export const findUserById = async (id: string) => {
  return User.findById(id);
};

export const createUserToken = async (
  tokenData: Partial<IUserToken>
): Promise<IUserToken> => {
  const userToken = new UserToken(tokenData);
  return userToken.save();
};

export const findUserTokenById = async (
  tokenId: string
): Promise<IUserToken | null> => {
  if (!mongoose.Types.ObjectId.isValid(tokenId)) {
    return null;
  }

  return UserToken.findOne({ _id: tokenId });
};

export const verifyUserEmail = async (
  userId: string
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
};

export const updateUserToken = async (
  tokenId: string,
  updateData: Partial<IUserToken>
): Promise<IUserToken | null> => {
  return UserToken.findByIdAndUpdate(tokenId, updateData, {
    new: true,
  });
};

// export default {
//   // createUserRegistration,
//   // updateUserRegistration,
//   getAllActiveUsers,
//   // getAllUsersWithDonationHistory,
//   // getSingleUser,
//   // getMyPost,
//   // getMyDonationHistory,
//   // getAllUsers,
//   // makeConnection,
//   // connectedUsers,
//   // pointReduction,
//   // getRequestedDonor,
//   // changePassword,
//   // verifyOtp,
//   // resetPassword,
// };
