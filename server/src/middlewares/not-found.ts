import { NextFunction, Request, Response } from "express";
import { createCustomError } from "../errors";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = createCustomError(`Not found - ${req.originalUrl}`, 404);
  next(error);
};

export default notFound;
