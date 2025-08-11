import adminRouter from "../modules/admin/admin.route";
import { quizRouter } from "../modules/quiz/quiz.router";
import { userRouter } from "../modules/users/user.route";
import { Router } from "express";

const router = Router();

const routers = [
  {
    path: "/users",
    route: userRouter,
  },
  {
    path: "/quizzes",
    route: quizRouter,
  },
  {
    path: "/admin",
    route: adminRouter,
  },
];

routers.forEach((route) => router.use(route.path, route.route));

export default router;
