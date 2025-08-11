"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserEmail = exports.findUserById = exports.findUserByEmail = exports.createUser = exports.getAllActiveUsers = void 0;
// import { BloodPost } from "../bloodPost/bloodPost.model";
// import { DonorRequest } from "../donorRequest/donorRequest.model";
// import { TUser } from "./user.interface";
const user_model_1 = require("./user.model");
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
const getAllActiveUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({});
    if (!result) {
        throw new Error("Failed to retrieve all active users");
    }
    return result;
});
exports.getAllActiveUsers = getAllActiveUsers;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new user_model_1.User(userData);
    return user.save();
});
exports.createUser = createUser;
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findOne({ email }).select("+password");
});
exports.findUserByEmail = findUserByEmail;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findById(id);
});
exports.findUserById = findUserById;
// export const createUserToken = async (
//   tokenData: Partial<IUserToken>
// ): Promise<IUserToken> => {
//   const userToken = new UserToken(tokenData);
//   return userToken.save();
// };
// export const findUserTokenById = async (
//   tokenId: string
// ): Promise<IUserToken | null> => {
//   if (!mongoose.Types.ObjectId.isValid(tokenId)) {
//     return null;
//   }
//   return UserToken.findOne({ _id: tokenId });
// };
const verifyUserEmail = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
});
exports.verifyUserEmail = verifyUserEmail;
// export const updateUserToken = async (
//   tokenId: string,
//   updateData: Partial<IUserToken>
// ): Promise<IUserToken | null> => {
//   return UserToken.findByIdAndUpdate(tokenId, updateData, {
//     new: true,
//   });
// };
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
