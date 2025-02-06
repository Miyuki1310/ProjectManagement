import { Router } from "express";
import { userController } from "../../controllers";
const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:cognitoId", userController.getUser);

export default userRouter;
