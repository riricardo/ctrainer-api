import "dotenv/config";

type EnvSource = NodeJS.ProcessEnv;

export type AppEnv = {
  nodeEnv: string;
  port: number;
  mongoUri: string | undefined;
  mongoDbName: string | undefined;
  corsOrigins: string[];
  bodySizeLimit: string;
  docsEnabled: boolean;
  firebase: {
    projectId: string | undefined;
    clientEmail: string | undefined;
    privateKey: string | undefined;
  };
};

const parseCorsOrigins = (source: EnvSource) =>
  (source.CORS_ORIGINS || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

const buildEnv = (source: EnvSource = process.env): AppEnv => ({
  nodeEnv: source.NODE_ENV || "development",
  port: Number(source.PORT || 3000),
  mongoUri: source.MONGO_URI,
  mongoDbName: source.MONGO_DB_NAME,
  corsOrigins: parseCorsOrigins(source),
  bodySizeLimit: source.BODY_SIZE_LIMIT || "100kb",
  docsEnabled: source.DOCS_ENABLED === "true",
  firebase: {
    projectId: source.FIREBASE_PROJECT_ID,
    clientEmail: source.FIREBASE_CLIENT_EMAIL,
    privateKey: source.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
});

const env = buildEnv();

export { buildEnv };
export default env;
