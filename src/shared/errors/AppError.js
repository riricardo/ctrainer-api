const httpStatus = require("../http/http-status");

class AppError extends Error {
  constructor(message, status = httpStatus.internalServerError, code, details) {
    super(message);
    this.name = "AppError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

module.exports = AppError;
