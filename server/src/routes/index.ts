import { Router } from "express";
import projectRouter from "./project";
import taskRouter from "./task";
import searchRouter from "./search";
import userRouter from "./user";
import teamRouter from "./team";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
router.use("/search", searchRouter);
router.use("/users", userRouter);
router.use("/teams", teamRouter);
export default router;
