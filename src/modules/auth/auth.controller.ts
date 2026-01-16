import { Request, Response } from "express";
import asyncHandler from "../../shared/utils/asyncHandler";
import httpStatus from "../../shared/http/http-status";
import { AuthUserResponse } from "./auth.dtos";

const buildAuthController = () => ({
  me: asyncHandler(async (req: Request, res: Response) => {
    res
      .status(httpStatus.ok)
      .json({ data: (req.auth as AuthUserResponse | undefined) || null });
  }),
});

export default buildAuthController;
