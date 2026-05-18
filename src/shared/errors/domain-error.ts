import AppError from "shared/errors/AppError";
import { AppErrorCode } from "shared/errors/error-codes";
import { HttpStatus } from "shared/http/http-status";

const domainError = (
  message: string,
  status: HttpStatus = HttpStatus.BadRequest,
  code?: AppErrorCode,
  details?: unknown
) => new AppError(message, status, code, details);

export default domainError;
