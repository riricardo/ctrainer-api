const AppError = require("../shared/errors/AppError");
const httpStatus = require("../shared/http/http-status");

const requireAuth = (authProvider) => async (req, res, next) => {
  try {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (!token) {
      throw new AppError(
        "Missing auth token",
        httpStatus.unauthorized,
        "auth_required"
      );
    }

    const decoded = await authProvider.verifyIdToken(token);
    req.auth = { uid: decoded.uid, token: decoded };

    return next();
  } catch (err) {
    const status = err.status || httpStatus.unauthorized;
    const code = err.code || "invalid_token";
    return next(new AppError("Invalid auth token", status, code));
  }
};

module.exports = requireAuth;
