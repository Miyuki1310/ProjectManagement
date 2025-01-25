import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { CustomApiError } from "../../errors";

const prisma = new PrismaClient();

class TaskController {
  getTasks = asyncWrapper(
    async (req: Request, res: Response): Promise<object> => {
      const { projectId } = req.query;
      const tasks = await prisma.task.findMany({
        where: {
          projectId: Number(projectId),
        },
        include: {
          author: true,
          assignee: true,
          comments: true,
          attachments: true,
        },
      });
      if (!tasks) {
        return res.status(404).json({ message: "No tasks found" });
      }
      return res.status(200).json(tasks);
    }
  );

  createTask = asyncWrapper(
    async (req: Request, res: Response): Promise<object> => {
      const {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      } = req.body;
      const newTask = await prisma.task.create({
        data: {
          title,
          description,
          status,
          priority,
          tags,
          startDate: startDate ? new Date(startDate) : undefined,
          dueDate: dueDate ? new Date(dueDate) : undefined,
          points,
          projectId,
          authorUserId,
          assignedUserId,
        },
      });
      if (!newTask) {
        throw new CustomApiError("Task not created", 400);
      }
      return res.status(201).json(newTask);
    }
  );

  updateTask = asyncWrapper(async (req: Request, res: Response) => {
    const { taskId } = req.params;
    const { status } = req.body;
    console.log(taskId, req.body);

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status,
      },
    });
    if (!updatedTask) {
      throw new CustomApiError("Task not updated", 400);
    }
    return res.status(200).json(updatedTask);
  });
}

const taskController = new TaskController();
export default taskController;
