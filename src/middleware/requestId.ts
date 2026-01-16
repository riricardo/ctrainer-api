import { randomUUID } from "crypto";
import { NextFunction, Request, Response } from "express";

const requestId = (req: Request, res: Response, next: NextFunction) => {
  const incoming = req.headers["x-request-id"];
  const id = Array.isArray(incoming) ? incoming[0] : incoming || randomUUID();

  req.id = id;
  res.setHeader("x-request-id", id);
  next();
};

export default requestId;
