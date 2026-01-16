import express, { Application } from "express";
import buildHealthRoutes from "../modules/health/health.routes";
import buildWorkoutRoutes from "../modules/workouts/workouts.routes";
import buildWorkoutLogRoutes from "../modules/workout-logs/workout-logs.routes";
import buildAuthRoutes from "../modules/auth/auth.routes";
import { AppContainer } from "../shared/types/container";

const registerRoutes = (app: Application, container: AppContainer) => {
  const router = express.Router();

  router.use(buildHealthRoutes());
  router.use("/auth", buildAuthRoutes());
  router.use("/workouts", buildWorkoutRoutes(container));
  router.use("/workout-logs", buildWorkoutLogRoutes(container));

  app.use("/api", router);
};

export default registerRoutes;
