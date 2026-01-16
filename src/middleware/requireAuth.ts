import { NextFunction, Request, Response } from "express";
import AppError from "../shared/errors/AppError";
import httpStatus from "../shared/http/http-status";

const requireAuth =
  (authProvider: {
    verifyIdToken: (token: string) => Promise<{ uid: string } & Record<string, unknown>>;
  }) =>
  async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (err: unknown) {
    const error = err as { status?: number; code?: string };
    const status = error.status || httpStatus.unauthorized;
    const code = error.code || "invalid_token";
    return next(new AppError("Invalid auth token", status, code));
  }
};

export default requireAuth;
