import { Router } from "express";
import projectRouter from "./project";
const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World");
});
router.use("/projects", projectRouter);
export default router;
