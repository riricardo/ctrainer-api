import express from "express";
import buildHealthController from "./health.controller";

const buildHealthRoutes = () => {
  const router = express.Router();
  const controller = buildHealthController();

  router.get("/health", controller.health);

  return router;
};

export default buildHealthRoutes;
