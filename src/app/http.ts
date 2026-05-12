import express from "express";
import cors from "cors";
import helmet from "helmet";
import env, { AppEnv } from "../config/env";
import requestId from "../middleware/requestId";
import errorHandler from "../middleware/errorHandler";
import registerRoutes from "./routes";
import httpStatus from "../shared/http/http-status";
import { AppContainer } from "../shared/types/container";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

const isOriginAllowed = (origin: string | undefined, corsOrigins: string[]) => {
  const isCallWithNoOrigin = !origin;
  const isAllowAnyOrigin = corsOrigins.includes("*");
  const isOriginInTheList = corsOrigins.includes(origin ?? "");

  return isCallWithNoOrigin || isAllowAnyOrigin || isOriginInTheList;
};

const buildRootHandler =
  (appEnv: AppEnv) => (_req: express.Request, res: express.Response) => {
    if (appEnv.docsEnabled) {
      res.redirect(httpStatus.found, "/docs");
      return;
    }

    res.sendStatus(httpStatus.noContent);
  };

const createHttpApp = (container: AppContainer, deps: { env?: AppEnv } = {}) => {
  const appEnv = deps.env ?? env;
  const app = express();

  app.use(helmet());
  app.use(
    cors({
      origin: (origin, callback) => {
        if (isOriginAllowed(origin, appEnv.corsOrigins)) {
          callback(null, true);
          return;
        }

        callback(new Error("Not allowed by CORS"));
      },
    })
  );
  app.use(express.json({ limit: appEnv.bodySizeLimit }));
  app.use(express.urlencoded({ extended: false, limit: appEnv.bodySizeLimit }));
  app.use(requestId);

  if (appEnv.docsEnabled) {
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  app.get("/", buildRootHandler(appEnv));

  registerRoutes(app, container);

  app.use((req, res) => {
    res.status(httpStatus.notFound).json({ error: { message: "Not found" } });
  });

  app.use(errorHandler);

  return app;
};

export { buildRootHandler, isOriginAllowed };
export default createHttpApp;
