const express = require("express");
const buildHealthController = require("./health.controller");

const buildHealthRoutes = () => {
  const router = express.Router();
  const controller = buildHealthController();

  router.get("/health", controller.health);

  return router;
};

module.exports = buildHealthRoutes;
