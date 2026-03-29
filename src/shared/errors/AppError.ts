import httpStatus from "../http/http-status";

class AppError extends Error {
  status: number;
  code?: string;
  details?: unknown;

  static authRequired(details?: unknown) {
    return new AppError(
      "Missing auth token",
      httpStatus.unauthorized,
      "auth_required",
      details
    );
  }

  static invalidToken(details?: unknown) {
    return new AppError(
      "Invalid auth token",
      httpStatus.unauthorized,
      "invalid_token",
      details
    );
  }

  static forbidden(details?: unknown) {
    return new AppError("Forbidden", httpStatus.forbidden, "forbidden", details);
  }

  static workoutNotFound(details?: unknown) {
    return new AppError(
      "Workout not found",
      httpStatus.notFound,
      "workout_not_found",
      details
    );
  }

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
