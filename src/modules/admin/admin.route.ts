import { Router } from "express";
import { adminGuard } from "../../middlewares/auth";
import { getAllUsers, getUser } from "./admin.controller";

const adminRouter = Router();

adminRouter.get("/users", adminGuard, getAllUsers);
adminRouter.get("/users/:id", adminGuard, getUser);

export default adminRouter;
