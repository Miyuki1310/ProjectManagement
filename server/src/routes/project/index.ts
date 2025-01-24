import { Router } from "express";
import { projectController } from "../../controllers";
import projectValidation from "../../validations/project";

const projectRouter = Router();

projectRouter.get("/", projectController.getProjects);
projectRouter.post(
  "/",
  projectValidation.createProject,
  projectController.createProject
);

export default projectRouter;
