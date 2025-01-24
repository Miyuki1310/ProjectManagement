"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const errors_1 = require("../../errors");
const createSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    startDate: joi_1.default.date().required(),
    endDate: joi_1.default.date().required(),
});
class ProjectValidation {
    constructor() {
        this.createProject = (req, res, next) => {
            const { error } = createSchema.validate(req.body);
            if (error) {
                throw new errors_1.CustomApiError(error.message, 400);
            }
            next();
        };
    }
}
const projectValidation = new ProjectValidation();
exports.default = projectValidation;
