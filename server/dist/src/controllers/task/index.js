"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const asyncWrapper_1 = __importDefault(require("../../middlewares/asyncWrapper"));
const errors_1 = require("../../errors");
const prisma = new client_1.PrismaClient();
class TaskController {
    constructor() {
        this.getTasks = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { projectId } = req.query;
            const tasks = yield prisma.task.findMany({
                where: {
                    projectId: Number(projectId),
                },
                include: {
                    author: true,
                    assignee: true,
                    comments: true,
                    attachments: true,
                },
            });
            if (!tasks) {
                return res.status(404).json({ message: "No tasks found" });
            }
            return res.status(200).json(tasks);
        }));
        this.createTask = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
            const newTask = yield prisma.task.create({
                data: {
                    title,
                    description,
                    status,
                    priority,
                    tags,
                    startDate: startDate ? new Date(startDate) : undefined,
                    dueDate: dueDate ? new Date(dueDate) : undefined,
                    points,
                    projectId,
                    authorUserId,
                    assignedUserId,
                },
            });
            if (!newTask) {
                throw new errors_1.CustomApiError("Task not created", 400);
            }
            return res.status(201).json(newTask);
        }));
        this.updateTask = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { taskId } = req.params;
            const { status } = req.body;
            const updatedTask = yield prisma.task.update({
                where: {
                    id: Number(taskId),
                },
                data: {
                    status,
                },
            });
            if (!updatedTask) {
                throw new errors_1.CustomApiError("Task not updated", 400);
            }
            return res.status(200).json(updatedTask);
        }));
    }
}
const taskController = new TaskController();
exports.default = taskController;
