import express from "express";
import buildWorkoutLogsController from "./workout-logs.controller";
import requireAuth from "../../middleware/requireAuth";
import { AppContainer } from "../../shared/types/container";

const buildWorkoutLogRoutes = (container: AppContainer) => {
  const router = express.Router();
  const controller = buildWorkoutLogsController(container);
  const guard = requireAuth(container.authProvider);

  router.post("/", guard, controller.create);
  router.get("/my", guard, controller.listMy);

  return router;
};

export default buildWorkoutLogRoutes;
