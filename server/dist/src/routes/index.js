"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_1 = __importDefault(require("./project"));
const task_1 = __importDefault(require("./task"));
const search_1 = __importDefault(require("./search"));
const user_1 = __importDefault(require("./user"));
const team_1 = __importDefault(require("./team"));
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    res.send("Hello World");
});
router.use("/projects", project_1.default);
router.use("/tasks", task_1.default);
router.use("/search", search_1.default);
router.use("/users", user_1.default);
router.use("/teams", team_1.default);
exports.default = router;
