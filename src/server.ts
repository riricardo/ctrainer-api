import app from "./app";
import env from "./config/env";
import logger from "./config/logger";
import { connectDb } from "./infrastructure/db/mongoose";

const start = async () => {
  try {
    logger.info("Connecting to the database...");
    await connectDb();
    logger.info("Database connected");

    app.listen(env.port, () => {
      logger.info(`Server running on http://localhost:${env.port}`);
    });
  } catch (err) {
    logger.error("Failed to start server:", err);
    process.exit(1);
  }
};

start();
