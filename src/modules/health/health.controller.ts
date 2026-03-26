import { Request, Response } from "express";
import {
  triggerDbConnect,
  getDbHealth,
} from "../../infrastructure/db/mongoose";
const buildHealthController = () => ({
  health: async (req: Request, res: Response) => {
    await triggerDbConnect();

    const db = getDbHealth();

    res.json({ db });
  },
});

export default buildHealthController;
