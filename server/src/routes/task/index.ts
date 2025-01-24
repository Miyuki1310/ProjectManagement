import { Router } from "express";
import { taskController } from "../../controllers";

const taskRouter = Router();
taskRouter.get("/", taskController.getTasks);
taskRouter.post("/", taskController.createTask);
taskRouter.put("/:taskId", taskController.updateTask);

export default taskRouter;
