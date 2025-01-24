"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const project_1 = __importDefault(require("../../validations/project"));
const projectRouter = (0, express_1.Router)();
projectRouter.get("/", controllers_1.projectController.getProjects);
projectRouter.post("/", project_1.default.createProject, controllers_1.projectController.createProject);
exports.default = projectRouter;
