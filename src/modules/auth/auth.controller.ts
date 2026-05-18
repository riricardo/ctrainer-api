import { Request, Response } from "express";
import asyncHandler from "shared/utils/asyncHandler";
import { HttpStatus } from "shared/http/http-status";
import { AuthUserResponse } from "modules/auth/auth.dtos";

const buildAuthController = () => ({
  me: asyncHandler(async (req: Request, res: Response) => {
    res
      .status(HttpStatus.Ok)
      .json({ data: (req.auth as AuthUserResponse | undefined) || null });
  }),
});

export default buildAuthController;
