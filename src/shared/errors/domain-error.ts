import AppError from "./AppError";
import httpStatus from "../http/http-status";

const domainError = (
  message: string,
  status = httpStatus.badRequest,
  code?: string,
  details?: unknown
) => new AppError(message, status, code, details);

export default domainError;
