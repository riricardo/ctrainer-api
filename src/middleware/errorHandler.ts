import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";
import {
  isDbConnectionError,
  triggerDbConnect,
} from "../infrastructure/db/mongoose";
import AppError from "../shared/errors/AppError";
import httpStatus from "../shared/http/http-status";

type UnknownError = {
  status?: number;
  code?: string;
  details?: unknown;
  message?: string;
};

type ErrorResponse = {
  status: number;
  message: string;
  code?: string;
  details?: unknown;
  shouldReconnectDb: boolean;
};

const buildErrorResponse = (err: unknown): ErrorResponse => {
  const isAppError = err instanceof AppError;
  const shouldReconnectDb = !isAppError && isDbConnectionError(err);

  if (shouldReconnectDb) {
    return {
      status: httpStatus.serviceUnavailable,
      message: "Database unavailable",
      code: "database_unavailable",
      shouldReconnectDb: true,
    };
  }  
  
  const error = err as UnknownError;

  return {
    status: error.status || httpStatus.internalServerError,
    message: error.message || "Unexpected error",
    code: error.code,
    details: error.details,
    shouldReconnectDb,
  };
};

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = buildErrorResponse(err);

  if (response.shouldReconnectDb) {
    logger.error("Database request failed. Triggering reconnect.", err);
    triggerDbConnect();
  }

  const errorPayload = {
    message: response.message,
    code: response.code,
    details: response.details,
  };

  res.status(response.status).json({ error: errorPayload });
};

export default errorHandler;
