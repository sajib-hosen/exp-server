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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getAllUsers = void 0;
const user_service_1 = require("../users/user.service");
const expiry_stamp_1 = require("../../util/expiry-stamp");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reqUser = req.user;
        if (!(reqUser === null || reqUser === void 0 ? void 0 : reqUser.id)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = yield (0, user_service_1.findUserById)(reqUser.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const _a = user.toObject(), { password } = _a, safeUser = __rest(_a, ["password"]);
        res.status(200).json(safeUser);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllUsers = getAllUsers;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield (0, user_service_1.findUserByEmail)(email);
        if (!user) {
            return res.status(200).json({
                message: "If a matching account exists, a reset link has been sent.",
            });
        }
        if (!user.isVerified)
            return res.status(401).json({ message: "User not verified" });
        const resetToken = yield (0, user_service_1.createUserToken)({
            type: "reset-password",
            email,
            isUsed: false,
            expiresAt: expiry_stamp_1.EXPIRY_STAMP,
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
    }
    catch (err) {
        next(err);
    }
});
exports.getUser = getUser;
