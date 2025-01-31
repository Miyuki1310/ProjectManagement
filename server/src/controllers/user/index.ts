import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserController {
  getUsers = asyncWrapper(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users);
  });
}

const userController = new UserController();
export default userController;
