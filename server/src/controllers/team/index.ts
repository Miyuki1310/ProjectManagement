import { Request, Response } from "express";
import asyncWrapper from "../../middlewares/asyncWrapper";
import { PrismaClient, Team } from "@prisma/client";
const prisma = new PrismaClient();

class TeamController {
  getTeams = asyncWrapper(async (req: Request, res: Response) => {
    const teams = await prisma.team.findMany();

    const teamWithUsernames = await Promise.all(
      teams
        .filter((team: Team) => team.productOwnerUserId !== null)
        .map(async (team: Team) => {
          const productOwners = await prisma.user.findUnique({
            where: {
              userId: team.productOwnerUserId as number,
            },
            select: {
              username: true,
            }, // explain: select only username
          });
          const projectManager = await prisma.user.findUnique({
            where: {
              userId: team.projectManagerUserId as number,
            },
            select: {
              username: true,
            },
          });
          return {
            ...team,
            productOwnerUsername: productOwners?.username,
            projectManagerUsername: projectManager?.username,
          };
        })
    );
    if (!teamWithUsernames) {
      return res.status(404).json({ message: "No team found" });
    }
    return res.status(200).json(teamWithUsernames);
  });
}

const teamController = new TeamController();
export default teamController;
