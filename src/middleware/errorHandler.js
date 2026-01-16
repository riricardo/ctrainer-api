const AppError = require("../shared/errors/AppError");
const httpStatus = require("../shared/http/http-status");

const errorHandler = (err, req, res, next) => {
  const isAppError = err instanceof AppError;
  const status = isAppError
    ? err.status
    : err.status || httpStatus.internalServerError;
  const message =
    err.message ||
    (status >= httpStatus.internalServerError
      ? "Internal server error"
      : "Request failed");
  const code = isAppError ? err.code : err.code;

  const payload = {
    error: {
      message,
      ...(code ? { code } : {}),
      ...(err.details ? { details: err.details } : {}),
    },
  };

  res.status(status).json(payload);
};

module.exports = errorHandler;
