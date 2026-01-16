const express = require("express");
const buildWorkoutLogsController = require("./workout-logs.controller");
const requireAuth = require("../../middleware/requireAuth");

const buildWorkoutLogRoutes = (container) => {
  const router = express.Router();
  const controller = buildWorkoutLogsController(container);
  const guard = requireAuth(container.authProvider);

  router.post("/", guard, controller.create);
  router.get("/my", guard, controller.listMy);

  return router;
};

module.exports = buildWorkoutLogRoutes;
