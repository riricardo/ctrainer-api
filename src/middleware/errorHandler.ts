import { NextFunction, Request, Response } from "express";
import AppError from "../shared/errors/AppError";
import httpStatus from "../shared/http/http-status";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = err as {
    status?: number;
    code?: string;
    details?: unknown;
    message?: string;
  };
  const isAppError = err instanceof AppError;
  const status = isAppError
    ? err.status
    : error.status || httpStatus.internalServerError;
  const message =
    error.message ||
    (status >= httpStatus.internalServerError
      ? "Internal server error"
      : "Request failed");
  const code = isAppError ? err.code : error.code;

  const payload = {
    error: {
      message,
      ...(code ? { code } : {}),
      ...(error.details ? { details: error.details } : {}),
    },
  };

  res.status(status).json(payload);
};

export default errorHandler;
