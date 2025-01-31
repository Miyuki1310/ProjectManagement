import { Router } from "express";
import { userController } from "../../controllers";
const userRouter = Router();

userRouter.get("/", userController.getUsers);

export default userRouter;