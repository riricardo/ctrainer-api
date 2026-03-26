import mongoose from "mongoose";
import env from "../../config/env";
import logger from "../../config/logger";

let connectionPromise: Promise<void> | null = null;

const isDbConnected = () => mongoose.connection.readyState === 1;

const connectDb = async () => {
  if (isDbConnected()) return;

  if (connectionPromise) return connectionPromise;

  if (!env.mongoUri) throw new Error("MONGO_URI is not set");

  connectionPromise = mongoose
    .connect(env.mongoUri, {
      dbName: env.mongoDbName,
    })
    .then(() => undefined)
    .finally(() => {
      connectionPromise = null;
    });

  return connectionPromise;
};

const triggerDbConnect = async () => {
  try {
    if (isDbConnected()) return;
    await connectDb();
    logger.info("Database connected");
  } catch (err) {
    logger.error("Database connection attempt failed:", err);
  }
};

const isDbConnectionError = (err: unknown) => {
  if (mongoose.connection.readyState === 1) return false;

  const error = err as { name?: string; message?: string };
  const message = error.message?.toLowerCase() || "";

  return (
    error.name === "MongooseServerSelectionError" ||
    error.name === "MongoServerSelectionError" ||
    message.includes("buffering timed out") ||
    message.includes("topology is closed") ||
    message.includes("client must be connected")
  );
};

const getDbHealth = () => {
  const state = mongoose.connection.readyState;
  const stateLabels = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
  ];

  return {
    isDbUp: isDbConnected(),
    state,
    stateLabel: stateLabels[state] || "unknown",
  };
};

export { triggerDbConnect, isDbConnectionError, getDbHealth };
