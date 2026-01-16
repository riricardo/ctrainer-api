import { Request, Response } from "express";
import { getDbHealth } from "../../infrastructure/db/mongoose";
import httpStatus from "../../shared/http/http-status";

const buildHealthController = () => ({
  health: (req: Request, res: Response) => {
    const db = getDbHealth();
    const isHealthOk = db.isDbUp;

    const status = isHealthOk ? "ok" : "degraded";
    const code = isHealthOk ? httpStatus.ok : httpStatus.serviceUnavailable;

    res.status(code).json({ status, db });
  },
});

export default buildHealthController;
