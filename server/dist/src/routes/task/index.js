"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const taskRouter = (0, express_1.Router)();
taskRouter.get("/", controllers_1.taskController.getTasks);
taskRouter.post("/", controllers_1.taskController.createTask);
taskRouter.put("/:taskId", controllers_1.taskController.updateTask);
exports.default = taskRouter;
