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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenGuard = accessTokenGuard;
exports.refreshTokenGuard = refreshTokenGuard;
exports.adminGuard = adminGuard;
const config_1 = __importDefault(require("../config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const auth = () => {
//   return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
//     //console.log("req.headers.authorization");
//     const token = req.headers.authorization;
//     // ----------- checking whether token is sent or not -----------
//     if (!token) {
//       throw new AppError(401, "you are not authorized");
//     }
//     jwt.verify(
//       token,
//       config.jwt.access_secret as string,
//       function (err, decoded) {
//         // ------- err --------
//         if (err) {
//           throw new AppError(401, "You are not authorized");
//         }
//         req.user = decoded as JwtPayload;
//       }
//     );
//     next();
//   });
// };
// export default auth;
function accessTokenGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt.access_secret);
                if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
                    return res.status(401).json({ message: "User unauthorized!" });
                }
                req.user = {
                    id: decoded.id,
                    role: decoded.role,
                    email: decoded.email,
                };
                next();
            }
            catch (error) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid access token" });
            }
        }
        else {
            return res
                .status(401)
                .json({ message: "Unauthorized: No access token provided" });
        }
    });
}
function refreshTokenGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
                if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id)) {
                    return res.status(401).json({ message: "User unauthorized!" });
                }
                req.user = {
                    id: decoded.id,
                    role: decoded.role,
                    email: decoded.email,
                };
                next();
            }
            catch (error) {
                console.log("refresh error", error);
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid refresh token" });
            }
        }
        else {
            return res
                .status(401)
                .json({ message: "Unauthorized: No refresh token provided" });
        }
    });
}
function adminGuard(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            const token = authHeader.split(" ")[1];
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                // console.log("admin guard", decoded);
                if (!(decoded === null || decoded === void 0 ? void 0 : decoded.id) || decoded.role !== "admin") {
                    return res.status(401).json({ message: "User unauthorized!" });
                }
                req.user = {
                    id: decoded.id,
                    role: decoded.role,
                    email: decoded.email,
                };
                next();
            }
            catch (error) {
                return res
                    .status(401)
                    .json({ message: "Unauthorized: Invalid access token" });
            }
        }
        else {
            return res
                .status(401)
                .json({ message: "Unauthorized: No access token provided" });
        }
    });
}
