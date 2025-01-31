"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamController = exports.userController = exports.searchController = exports.taskController = exports.projectController = void 0;
const project_1 = __importDefault(require("./project"));
exports.projectController = project_1.default;
const task_1 = __importDefault(require("./task"));
exports.taskController = task_1.default;
const search_1 = __importDefault(require("./search"));
exports.searchController = search_1.default;
const user_1 = __importDefault(require("./user"));
exports.userController = user_1.default;
const team_1 = __importDefault(require("./team"));
exports.teamController = team_1.default;
