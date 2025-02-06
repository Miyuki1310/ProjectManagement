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

  getUser = asyncWrapper(async (req: Request, res: Response) => {
    const { cognitoId } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId as string,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  });

  createUser = asyncWrapper(async (req: Request, res: Response) => {
    const {
      username,
      cognitoId,
      profilePictureUrl = "i1.jpg",
      teamId = 1,
    } = req.body;
    console.log(cognitoId);

    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });

    if (!newUser) {
      return res.status(400).json({ message: "User not created" });
    }
    return res.status(201).json(newUser);
  });
}

const userController = new UserController();
export default userController;
