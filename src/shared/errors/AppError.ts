import { HttpStatus } from "../http/http-status";
import { AppErrorCode } from "./error-codes";

class AppError extends Error {
  status: HttpStatus;
  code?: AppErrorCode;
  details?: unknown;

  static authRequired(details?: unknown) {
    return new AppError(
      "Missing auth token",
      HttpStatus.Unauthorized,
      AppErrorCode.AuthRequired,
      details
    );
  }

  static invalidToken(details?: unknown) {
    return new AppError(
      "Invalid auth token",
      HttpStatus.Unauthorized,
      AppErrorCode.InvalidToken,
      details
    );
  }

  static forbidden(details?: unknown) {
    return new AppError(
      "Forbidden",
      HttpStatus.Forbidden,
      AppErrorCode.Forbidden,
      details
    );
  }

  static validationFailed(details?: unknown) {
    return new AppError(
      "Validation failed",
      HttpStatus.BadRequest,
      AppErrorCode.ValidationFailed,
      details
    );
  }

  static workoutNotFound(details?: unknown) {
    return new AppError(
      "Workout not found",
      HttpStatus.NotFound,
      AppErrorCode.WorkoutNotFound,
      details
    );
  }

  static workoutLogNotFound(details?: unknown) {
    return new AppError(
      "Workout log not found",
      HttpStatus.NotFound,
      AppErrorCode.WorkoutLogNotFound,
      details
    );
  }

  constructor(
    message: string,
    status: HttpStatus = HttpStatus.InternalServerError,
    code?: AppErrorCode,
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
