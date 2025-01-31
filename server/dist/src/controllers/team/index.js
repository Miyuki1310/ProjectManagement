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
class TeamController {
    constructor() {
        this.getTeams = (0, asyncWrapper_1.default)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const teams = yield prisma.team.findMany();
            const teamWithUsernames = yield Promise.all(teams
                .filter((team) => team.productOwnerUserId !== null)
                .map((team) => __awaiter(this, void 0, void 0, function* () {
                const productOwners = yield prisma.user.findUnique({
                    where: {
                        userId: team.productOwnerUserId,
                    },
                    select: {
                        username: true,
                    }, // explain: select only username
                });
                const projectManager = yield prisma.user.findUnique({
                    where: {
                        userId: team.projectManagerUserId,
                    },
                    select: {
                        username: true,
                    },
                });
                return Object.assign(Object.assign({}, team), { productOwnerUsername: productOwners === null || productOwners === void 0 ? void 0 : productOwners.username, projectManagerUsername: projectManager === null || projectManager === void 0 ? void 0 : projectManager.username });
            })));
            if (!teamWithUsernames) {
                return res.status(404).json({ message: "No team found" });
            }
            return res.status(200).json(teamWithUsernames);
        }));
    }
}
const teamController = new TeamController();
exports.default = teamController;
