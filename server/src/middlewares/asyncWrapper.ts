import { NextFunction, Request, Response } from "express";

const asyncWrapper = (fn: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};
export default asyncWrapper;
