"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const AppError_1 = __importDefault(require("./errors/AppError"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const cors_sites = [
    config_1.default.frontend_url,
    "https://school-test-one.vercel.app",
    "http://localhost:3000",
];
app.use((0, cors_1.default)({
    origin: cors_sites,
    credentials: true,
}));
app.use((0, helmet_1.default)());
// Limit JSON body size
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    next();
});
// General rate limiter for all APIs
const generalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 200,
    handler: (req, res, next) => {
        // Pass the error to your global error handler
        const error = new AppError_1.default(429, "Too many requests, please try again after 15 minutes.");
        next(error);
    },
});
app.use("/api/", generalLimiter);
app.use("/api/", routes_1.default);
app.get("/", (req, res) => {
    console.log("Request Origin:", req.headers.origin);
    res.send("Hello world");
});
// app.use(globalErrorHandler);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", cors_sites);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use(globalErrorHandler_1.default);
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API NOT Found !",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found",
        },
    });
});
exports.default = app;
