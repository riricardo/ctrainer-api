import { NextFunction, Request, Response } from "express";
import AppError from "../shared/errors/AppError";

const requireAuth =
  (authProvider: {
    verifyIdToken: (token: string) => Promise<{ uid: string } & Record<string, unknown>>;
  }) =>
  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization || "";
    const [, token] = header.split(" ");

    if (!token) {
      throw AppError.authRequired();
    }

    const decoded = await authProvider.verifyIdToken(token);
    req.auth = { uid: decoded.uid, token: decoded };

    return next();
  } catch (err: unknown) {
    if (err instanceof AppError)
      return next(err);

    return next(AppError.invalidToken());
  }
};

export default requireAuth;
