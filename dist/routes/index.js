"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quiz_router_1 = require("../modules/quiz/quiz.router");
const user_route_1 = require("../modules/users/user.route");
const express_1 = require("express");
const router = (0, express_1.Router)();
const routers = [
    {
        path: "/users",
        route: user_route_1.userRouter,
    },
    {
        path: "/quizzes",
        route: quiz_router_1.quizRouter,
    },
];
routers.forEach((route) => router.use(route.path, route.route));
exports.default = router;
