import { Request, Response } from "express";
import { CustomApiError } from "../errors";

const handleError = (err: CustomApiError, req: Request, res: Response) => {
  if (err instanceof CustomApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handleError;
