"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const userRouter = (0, express_1.Router)();
userRouter.get("/", controllers_1.userController.getUsers);
userRouter.post("/create-user", controllers_1.userController.createUser);
userRouter.get("/:cognitoId", controllers_1.userController.getUser);
exports.default = userRouter;
