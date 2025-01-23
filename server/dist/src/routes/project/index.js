"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const projectRouter = (0, express_1.Router)();
projectRouter.get("/", controllers_1.projectController.getProjects);
exports.default = projectRouter;
