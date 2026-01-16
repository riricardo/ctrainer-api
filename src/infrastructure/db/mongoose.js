const mongoose = require("mongoose");
const env = require("../../config/env");

const connectDb = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is not set");
  }

  const options = {};
  if (env.mongoDbName) {
    options.dbName = env.mongoDbName;
  }

  await mongoose.connect(env.mongoUri, options);
};

const getDbHealth = () => {
  const state = mongoose.connection.readyState;
  const stateLabels = [
    "disconnected",
    "connected",
    "connecting",
    "disconnecting",
  ];
  const isDbUp = state === 1;

  return {
    isDbUp,
    state,
    stateLabel: stateLabels[state] || "unknown",
  };
};

module.exports = {
  connectDb,
  getDbHealth,
};
