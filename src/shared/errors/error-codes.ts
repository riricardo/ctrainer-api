const AppErrorCode = {
  AuthRequired: "auth_required",
  DatabaseUnavailable: "database_unavailable",
  Forbidden: "forbidden",
  InternalError: "internal_error",
  InvalidToken: "invalid_token",
  ValidationFailed: "validation_failed",
  WorkoutLogNotFound: "workout_log_not_found",
  WorkoutNotFound: "workout_not_found",
} as const;

type AppErrorCode = (typeof AppErrorCode)[keyof typeof AppErrorCode];

export { AppErrorCode };
