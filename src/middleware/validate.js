const AppError = require("../shared/errors/AppError");
const httpStatus = require("../shared/http/http-status");

const validate = (schema, source = "body") => (req, res, next) => {
  if (!schema || typeof schema.validate !== "function") {
    return next();
  }

  const result = schema.validate(req[source], { abortEarly: false });
  if (!result.error) {
    return next();
  }

  const details = result.error.details
    ? result.error.details.map((detail) => detail.message)
    : undefined;

  return next(
    new AppError(
      "Validation failed",
      httpStatus.badRequest,
      "validation_failed",
      details
    )
  );
};

module.exports = validate;
