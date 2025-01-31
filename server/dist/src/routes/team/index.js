"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const teamRouter = (0, express_1.Router)();
teamRouter.get("/", controllers_1.teamController.getTeams);
exports.default = teamRouter;
