const mongoose = require("mongoose");

const connectDb = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  const options = {};
  const dbName = process.env.MONGO_DB_NAME;

  if (dbName) {
    options.dbName = dbName;
  }

  await mongoose.connect(uri, options);
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
