"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env") });
exports.default = {
    node_env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || "10",
    jwt: {
        access_secret: process.env.JWT_ACCESS_SECRET,
        refresh_secret: process.env.JWT_REFRESH_SECRET,
    },
    frontend_url: process.env.FRONTEND_URL,
    smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE === "true", // convert to boolean
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        from_name: process.env.SMTP_FROM_NAME,
        from_email: process.env.SMTP_FROM_EMAIL,
    },
};
