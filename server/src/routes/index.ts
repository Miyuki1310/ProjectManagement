import { Router } from "express";
import projectRouter from "./project";
import taskRouter from "./task";
import searchRouter from "./search";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
router.use("/search", searchRouter);
export default router;
