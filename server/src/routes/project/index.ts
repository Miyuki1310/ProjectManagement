import { Router } from "express";
import { projectController } from "../../controllers";

const projectRouter = Router();

projectRouter.get("/", projectController.getProjects);

export default projectRouter;
