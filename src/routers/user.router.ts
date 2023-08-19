import { Router } from "express";
import userController from "../controllers/user.controller";
import { emailExists, tokenValid, validateBody, verifyPermition } from "../middlewares";
import { userCreateSchema } from "../schemas";

const userRouter: Router = Router();

userRouter.post("", validateBody(userCreateSchema), emailExists, userController.createUser);
userRouter.get("", tokenValid, userController.readUsers);
userRouter.get("/:id/courses", tokenValid, verifyPermition, userController.readUsers);

export default userRouter;