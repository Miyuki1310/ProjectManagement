import { NextFunction, Request, Response } from "express";
import { CustomApiError } from "../errors";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new CustomApiError("Can not found this route", 400));
};

export default notFound;
