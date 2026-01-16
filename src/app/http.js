const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const env = require("../config/env");
const requestId = require("../middleware/requestId");
const errorHandler = require("../middleware/errorHandler");
const registerRoutes = require("./routes");
const httpStatus = require("../shared/http/http-status");
const packageJson = require("../../package.json");

const createHttpApp = (container) => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin,
    })
  );
  app.use(express.json());
  app.use(requestId);

  app.get("/", (req, res) => {
    res.status(httpStatus.ok).json({
      name: packageJson.name,
      version: packageJson.version,
      apiVersion: env.apiVersion,
    });
  });

  registerRoutes(app, container);

  app.use((req, res) => {
    res.status(httpStatus.notFound).json({ error: { message: "Not found" } });
  });

  app.use(errorHandler);

  return app;
};

module.exports = {
  createHttpApp,
};
