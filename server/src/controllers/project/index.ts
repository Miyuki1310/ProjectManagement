import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { CustomApiError } from "../../errors";

const prisma = new PrismaClient();

class ProjectController {
  getProjects = asyncWrapper(
    async (req: Request, res: Response): Promise<object> => {
      const projects = await prisma.project.findMany();
      if (!projects) {
        return res.status(404).json({ message: "No projects found" });
      }
      return res.status(200).json(projects);
    }
  );

  createProject = asyncWrapper(
    async (req: Request, res: Response): Promise<object> => {
      const { name, description, startDate, endDate } = req.body;
      const project = await prisma.project.create({
        data: {
          name,
          description,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
        },
      });
      if (!project) {
        throw new CustomApiError("Project not created", 400);
      }
      return res.status(201).json(project);
    }
  );
}

const projectController = new ProjectController();
export default projectController;
