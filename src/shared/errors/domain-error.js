const AppError = require("./AppError");
const httpStatus = require("../http/http-status");

const domainError = (message, status = httpStatus.badRequest, code, details) =>
  new AppError(message, status, code, details);

module.exports = domainError;
