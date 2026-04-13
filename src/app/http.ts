import express from "express";
import cors from "cors";
import helmet from "helmet";
import env from "../config/env";
import requestId from "../middleware/requestId";
import errorHandler from "../middleware/errorHandler";
import registerRoutes from "./routes";
import httpStatus from "../shared/http/http-status";
import { AppContainer } from "../shared/types/container";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const createHttpApp = (container: AppContainer) => {
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        const isCallWithNoOrigin = !origin;

        const isAllowAnyOrigin = env.corsOrigins.includes("*");

        const isOriginInTheList = env.corsOrigins.includes(origin ?? "");

        if (isCallWithNoOrigin || isAllowAnyOrigin || isOriginInTheList) {
          callback(null, true);
          return;
        }

        callback(new Error("Not allowed by CORS"));
      },
    })
  );
  app.use(express.json({ limit: env.bodySizeLimit }));
  app.use(express.urlencoded({ extended: false, limit: env.bodySizeLimit }));
  app.use(requestId);

  if (env.docsEnabled) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  app.get("/", (req, res) => {
    if (env.docsEnabled) {
      res.redirect(httpStatus.found, "/docs");
      return;
    }

    res.status(httpStatus.noContent);
  });

  registerRoutes(app, container);

  app.use((req, res) => {
    res.status(httpStatus.notFound).json({ error: { message: "Not found" } });
  });

  app.use(errorHandler);

  return app;
};

export default createHttpApp;
