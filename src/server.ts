import app from "./app";
import env from "./config/env";
import logger from "./config/logger";
import { triggerDbConnect } from "./infrastructure/db/mongoose";

const start = async () => {
  app.listen(env.port, () => {
    logger.info(`Server running on http://localhost:${env.port}`);
  });

  logger.info("Connecting to the database...");
  await triggerDbConnect();
};

start();
