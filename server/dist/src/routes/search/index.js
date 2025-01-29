"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const searchRouter = (0, express_1.Router)();
searchRouter.get("/", controllers_1.searchController.search);
exports.default = searchRouter;
