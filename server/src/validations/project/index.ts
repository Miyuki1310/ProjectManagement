import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { CustomApiError } from "../../errors";
const createSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});
class ProjectValidation {
  createProject = (req: Request, res: Response, next: NextFunction): any => {
    const { error } = createSchema.validate(req.body);
    if (error) {
      throw new CustomApiError(error.message, 400);
    }
    next();
  };
}

const projectValidation = new ProjectValidation();
export default projectValidation;
