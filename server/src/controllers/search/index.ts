import { PrismaClient } from "@prisma/client";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { Request, Response } from "express";
const prisma = new PrismaClient();

class SearchController {
  search = asyncWrapper(async (req: Request, res: Response) => {
    const { query } = req.query;
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found" });
    }
    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string } },
          { description: { contains: query as string } },
        ],
      },
    });
    if (!projects) {
      return res.status(404).json({ message: "No projects found" });
    }
    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string } }],
      },
    });
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json({ tasks, projects, users });
  });
}

const searchController = new SearchController();
export default searchController;
