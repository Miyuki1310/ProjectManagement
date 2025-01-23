import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ProjectController {
  getProjects = async (req: Request, res: Response) => {
    const projects = await prisma.project.findMany();
    res.status(200).json(projects);
  };
}

const projectController = new ProjectController();
export default projectController;
