import express from "express";
import cors from "cors";
import helmet from "helmet";
import env from "../config/env";
import requestId from "../middleware/requestId";
import errorHandler from "../middleware/errorHandler";
import registerRoutes from "./routes";
import httpStatus from "../shared/http/http-status";
import packageJson from "../../package.json";
import { AppContainer } from "../shared/types/container";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const createHttpApp = (container: AppContainer) => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: env.corsOrigin,
    })
  );
  app.use(express.json());
  app.use(requestId);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/", (req, res) => {
    res.redirect(httpStatus.found, "/docs");
  });

  registerRoutes(app, container);

  app.use((req, res) => {
    res.status(httpStatus.notFound).json({ error: { message: "Not found" } });
  });

  app.use(errorHandler);

  return app;
};

export default createHttpApp;
