import { RequestHandler } from "express";
import {
  createUserToken,
  findUserByEmail,
  findUserById,
} from "../users/user.service";
import { EXPIRY_STAMP } from "../../util/expiry-stamp";
import { IUser } from "../users/user.interface";

export const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const reqUser = (req as any).user as IUser;
    if (!reqUser?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await findUserById(reqUser.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...safeUser } = user.toObject();
    res.status(200).json(safeUser);
  } catch (err) {
    next(err);
  }
};

export const getUser: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(200).json({
        message: "If a matching account exists, a reset link has been sent.",
      });
    }
    if (!user.isVerified)
      return res.status(401).json({ message: "User not verified" });
    const resetToken = await createUserToken({
      type: "reset-password",
      email,
      isUsed: false,
      expiresAt: EXPIRY_STAMP,
    });
    const resetLink = `${process.env.CLIENT_BASE_URL}/reset-password/${resetToken.id}`;

    //     await sendEmail(
    //       email,
    //       `Reset your password for ${APP_NAME}`,
    //       resetPasswordEmailHTML(user.name, resetLink)
    //     );
    res.status(200).json({
      message: "If a matching account exists, a reset link has been sent.",
    });
  } catch (err) {
    next(err);
  }
};
