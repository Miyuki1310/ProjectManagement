"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = exports.projectController = void 0;
const project_1 = __importDefault(require("./project"));
exports.projectController = project_1.default;
const task_1 = __importDefault(require("./task"));
exports.taskController = task_1.default;
