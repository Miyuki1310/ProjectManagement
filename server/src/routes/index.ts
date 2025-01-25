import { Router } from "express";
import projectRouter from "./project";
import taskRouter from "./task";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
export default router;
