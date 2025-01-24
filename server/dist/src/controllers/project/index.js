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
class ProjectController {
    constructor() {
        this.getProjects = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const projects = yield prisma.project.findMany();
            if (!projects) {
                return res.status(404).json({ message: "No projects found" });
            }
            return res.status(200).json(projects);
        }));
        this.createProject = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { name, description, startDate, endDate } = req.body;
            const project = yield prisma.project.create({
                data: {
                    name,
                    description,
                    startDate: startDate ? new Date(startDate) : undefined,
                    endDate: endDate ? new Date(endDate) : undefined,
                },
            });
            if (!project) {
                throw new errors_1.CustomApiError("Project not created", 400);
            }
            return res.status(201).json(project);
        }));
    }
}
const projectController = new ProjectController();
exports.default = projectController;
