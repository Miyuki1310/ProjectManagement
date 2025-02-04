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
const asyncWrapper_1 = __importDefault(require("../../middlewares/asyncWrapper"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserController {
    constructor() {
        this.getUsers = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.user.findMany();
            if (!users) {
                return res.status(404).json({ message: "No users found" });
            }
            return res.status(200).json(users);
        }));
        this.getUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { cognitoId } = req.params;
            const user = yield prisma.user.findUnique({
                where: {
                    cognitoId,
                },
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json(user);
        }));
        this.createUser = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, cognitoId, profilePictureUrl = "i1.jpg", teamId = 1, } = req.body;
            const newUser = yield prisma.user.create({
                data: {
                    username,
                    cognitoId,
                    profilePictureUrl,
                    teamId,
                },
            });
            if (!newUser) {
                return res.status(400).json({ message: "User not created" });
            }
            return res.status(201).json(newUser);
        }));
    }
}
const userController = new UserController();
exports.default = userController;
