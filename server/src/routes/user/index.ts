import { Router } from "express";
import { userController } from "../../controllers";
const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/create-user", userController.createUser);

export default userRouter;
