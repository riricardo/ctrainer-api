import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildEnv } from "../src/config/env";

describe("buildEnv", () => {
  it("normalizes env values for tests and runtime", () => {
    const env = buildEnv({
      NODE_ENV: "test",
      PORT: "8080",
      MONGO_URI: "mongodb://localhost:27017/app",
      MONGO_DB_NAME: "ctrainer",
      CORS_ORIGINS: "https://a.com, https://b.com ,",
      BODY_SIZE_LIMIT: "1mb",
      DOCS_ENABLED: "true",
      FIREBASE_PROJECT_ID: "project-id",
      FIREBASE_CLIENT_EMAIL: "mail@example.com",
      FIREBASE_PRIVATE_KEY: "line1\\nline2",
    });

    assert.deepEqual(env, {
      nodeEnv: "test",
      port: 8080,
      mongoUri: "mongodb://localhost:27017/app",
      mongoDbName: "ctrainer",
      corsOrigins: ["https://a.com", "https://b.com"],
      bodySizeLimit: "1mb",
      docsEnabled: true,
      firebase: {
        projectId: "project-id",
        clientEmail: "mail@example.com",
        privateKey: "line1\nline2",
      },
    });
  });
});
