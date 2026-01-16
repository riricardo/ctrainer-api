const env = {
  port: Number(process.env.PORT || 3000),
  mongoUri: process.env.MONGO_URI,
  mongoDbName: process.env.MONGO_DB_NAME,
  corsOrigin: process.env.CORS_ORIGIN || "*",
  apiVersion: process.env.API_VERSION || "v1",
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
      ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  },
};

module.exports = env;
