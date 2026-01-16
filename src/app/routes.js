const express = require("express");
const buildHealthRoutes = require("../modules/health/health.routes");
const buildWorkoutRoutes = require("../modules/workouts/workouts.routes");
const buildWorkoutLogRoutes = require("../modules/workout-logs/workout-logs.routes");
const buildAuthRoutes = require("../modules/auth/auth.routes");
const env = require("../config/env");

const registerRoutes = (app, container) => {
  const router = express.Router();

  router.use(buildHealthRoutes(container));
  router.use("/auth", buildAuthRoutes(container));
  router.use("/workouts", buildWorkoutRoutes(container));
  router.use("/workout-logs", buildWorkoutLogRoutes(container));

  app.use(`/api/${env.apiVersion}`, router);
};

module.exports = registerRoutes;
