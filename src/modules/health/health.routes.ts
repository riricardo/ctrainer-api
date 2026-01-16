import express from "express";
import buildHealthController from "./health.controller";

const buildHealthRoutes = () => {
  const router = express.Router();
  const controller = buildHealthController();

  /**
   * @openapi
   * /api/health:
   *   get:
   *     summary: Health check
   *     responses:
   *       200:
   *         description: Service is healthy
   *       503:
   *         description: Service is degraded
   */
  router.get("/health", controller.health);

  return router;
};

export default buildHealthRoutes;
