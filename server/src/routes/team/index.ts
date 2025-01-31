import { Router } from "express";
import { teamController } from "../../controllers";
const teamRouter = Router();

teamRouter.get("/", teamController.getTeams);

export default teamRouter;
