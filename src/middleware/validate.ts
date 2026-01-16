import { NextFunction, Request, Response } from "express";
import AppError from "../shared/errors/AppError";
import httpStatus from "../shared/http/http-status";

const validate =
  (schema: any, source = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
  if (!schema || typeof schema.validate !== "function") {
    return next();
  }

  const result = schema.validate((req as any)[source], { abortEarly: false });
  if (!result.error) {
    return next();
  }

  const details = result.error.details
    ? result.error.details.map((detail: any) => detail.message)
    : undefined;

  return next(
    new AppError(
      "Validation failed",
      httpStatus.badRequest,
      "validation_failed",
      details
    )
  );
};

export default validate;
