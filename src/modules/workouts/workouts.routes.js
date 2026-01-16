const express = require("express");
const buildWorkoutsController = require("./workouts.controller");
const requireAuth = require("../../middleware/requireAuth");

const buildWorkoutRoutes = (container) => {
  const router = express.Router();
  const controller = buildWorkoutsController(container);
  const guard = requireAuth(container.authProvider);

  router.get("/public", controller.listPublic);
  router.get("/my", guard, controller.listMy);
  router.post("/", guard, controller.create);
  router.get("/:id", guard, controller.getById);
  router.put("/:id", guard, controller.updateById);
  router.delete("/:id", guard, controller.deleteById);
  router.post("/:id/copy", guard, controller.copy);

  return router;
};

module.exports = buildWorkoutRoutes;
