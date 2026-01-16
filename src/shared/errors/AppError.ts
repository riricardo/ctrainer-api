import httpStatus from "../http/http-status";

class AppError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  constructor(
    message: string,
    status = httpStatus.internalServerError,
    code?: string,
    details?: unknown
  ) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export default AppError;
