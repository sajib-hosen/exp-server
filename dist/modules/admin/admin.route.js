"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../../middlewares/auth");
const admin_controller_1 = require("./admin.controller");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/users", auth_1.adminGuard, admin_controller_1.getAllUsers);
adminRouter.get("/users/:id", auth_1.adminGuard, admin_controller_1.getUser);
exports.default = adminRouter;
