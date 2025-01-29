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
const prisma = new client_1.PrismaClient();
class SearchController {
    constructor() {
        this.search = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { query } = req.query;
            const tasks = yield prisma.task.findMany({
                where: {
                    OR: [
                        { title: { contains: query } },
                        { description: { contains: query } },
                    ],
                },
                include: {
                    author: true,
                    assignee: true,
                },
            });
            if (!tasks) {
                return res.status(404).json({ message: "No tasks found" });
            }
            const projects = yield prisma.project.findMany({
                where: {
                    OR: [
                        { name: { contains: query } },
                        { description: { contains: query } },
                    ],
                },
            });
            if (!projects) {
                return res.status(404).json({ message: "No projects found" });
            }
            const users = yield prisma.user.findMany({
                where: {
                    OR: [{ username: { contains: query } }],
                },
            });
            if (!users) {
                return res.status(404).json({ message: "No users found" });
            }
            return res.status(200).json({ tasks, projects, users });
        }));
    }
}
const searchController = new SearchController();
exports.default = searchController;
