import AppError from "./AppError";
import { AppErrorCode } from "./error-codes";
import { HttpStatus } from "../http/http-status";

const domainError = (
  message: string,
  status: HttpStatus = HttpStatus.BadRequest,
  code?: AppErrorCode,
  details?: unknown
) => new AppError(message, status, code, details);

export default domainError;
