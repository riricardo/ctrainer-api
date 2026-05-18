import { NextFunction, Request, Response } from "express";
import logger from "config/logger";
import {
  isDbConnectionError,
  triggerDbConnect,
} from "infrastructure/db/mongoose";
import AppError from "shared/errors/AppError";
import { AppErrorCode } from "shared/errors/error-codes";
import { HttpStatus } from "shared/http/http-status";

type ErrorResponse = {
  status: HttpStatus;
  message: string;
  code?: AppErrorCode;
  details?: unknown;
};

const isAppError = (err: unknown): err is AppError => err instanceof AppError;

const shouldTriggerDbReconnect = (err: unknown) =>
  !isAppError(err) && isDbConnectionError(err);

const buildErrorResponse = (err: unknown): ErrorResponse => {
  if (shouldTriggerDbReconnect(err)) {
    return {
      status: HttpStatus.ServiceUnavailable,
      message: "Database unavailable",
      code: AppErrorCode.DatabaseUnavailable,
    };
  }

  if (!isAppError(err)) {
    return {
      status: HttpStatus.InternalServerError,
      message: "Unexpected error",
      code: AppErrorCode.InternalError,
    };
  }

  return {
    status: err.status,
    message: err.message,
    code: err.code,
    details: err.details,
  };
};

const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const response = buildErrorResponse(err);

  if (shouldTriggerDbReconnect(err)) {
    logger.error("Database request failed. Triggering reconnect.", err);
    triggerDbConnect();
  }

  if (response.status >= HttpStatus.InternalServerError) {
    logger.error("Unhandled request error", err);
  }

  const errorPayload = {
    message: response.message,
    code: response.code,
    details: response.details,
  };

  res.status(response.status).json({ error: errorPayload });
};

export default errorHandler;
