import { Request, Response } from "express";
import { CustomApiError } from "../errors";

const handleError = (err: Error, req: Request, res: Response): any => {
  if (err instanceof CustomApiError) {
    return res.status(err.status).json({ message: err.message });
  } else return res.status(500).json({ message: "Something went wrong" });
};

export default handleError;
