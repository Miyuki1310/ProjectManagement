import { Router } from "express";
import { searchController } from "../../controllers";

const searchRouter = Router();

searchRouter.get("/", searchController.search);

export default searchRouter;
