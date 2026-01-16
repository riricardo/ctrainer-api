import { NextFunction, Request, Response } from "express";
import AppError from "../shared/errors/AppError";
import httpStatus from "../shared/http/http-status";

type ValidationResult = {
  error?: {
    details?: Array<{ message: string }>;
  };
};

type ValidationSchema = {
  validate: (value: unknown, options?: unknown) => ValidationResult;
};

const validate =
  (schema: ValidationSchema | null | undefined, source = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
  if (!schema || typeof schema.validate !== "function") {
    return next();
  }

  const requestSource = (req as unknown as Record<string, unknown>)[source];
  const result = schema.validate(requestSource, { abortEarly: false });
  if (!result.error) {
    return next();
  }

  const details = result.error.details
    ? result.error.details.map((detail) => detail.message)
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
