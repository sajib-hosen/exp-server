"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_route_1 = require("../modules/users/user.route");
// import { bloodPostRouter } from "../modules/bloodPost/bloodPost.route";
const express_1 = require("express");
// import { AuthRouters } from "../modules/auth/auth.route";
// import { donorRequestRouter } from "../modules/donorRequest/donorRequest.route";
// import { reviewRouter } from "../modules/review/review.route";
const router = (0, express_1.Router)();
const routers = [
    {
        path: "/users",
        route: user_route_1.userRouter,
    },
];
routers.forEach((route) => router.use(route.path, route.route));
exports.default = router;
