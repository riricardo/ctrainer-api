import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildRootHandler, isOriginAllowed } from "../src/app/http";
import { AppEnv } from "../src/config/env";

const createEnv = (docsEnabled: boolean): AppEnv => ({
  nodeEnv: "test",
  port: 3000,
  mongoUri: undefined,
  mongoDbName: undefined,
  corsOrigins: [],
  bodySizeLimit: "100kb",
  docsEnabled,
  firebase: {
    projectId: undefined,
    clientEmail: undefined,
    privateKey: undefined,
  },
});

describe("http helpers", () => {
  describe("isOriginAllowed", () => {
    it("allows requests without origin", () => {
      assert.equal(isOriginAllowed(undefined, ["https://app.example"]), true);
    });

    it("allows configured origins", () => {
      assert.equal(
        isOriginAllowed("https://app.example", ["https://app.example"]),
        true
      );
    });

    it("allows any origin when wildcard is configured", () => {
      assert.equal(isOriginAllowed("https://other.example", ["*"]), true);
    });

    it("rejects origins outside the allowlist", () => {
      assert.equal(
        isOriginAllowed("https://other.example", ["https://app.example"]),
        false
      );
    });
  });

  describe("buildRootHandler", () => {
    it("redirects root requests to docs when docs are enabled", () => {
      const handler = buildRootHandler(createEnv(true));
      const calls: unknown[][] = [];
      const res = {
        redirect: (...args: unknown[]) => {
          calls.push(args);
        },
        sendStatus: (_status: number) => {
          throw new Error("sendStatus should not be called");
        },
      };

      handler({} as never, res as never);

      assert.deepEqual(calls, [[302, "/docs"]]);
    });

    it("returns 204 when docs are disabled", () => {
      const handler = buildRootHandler(createEnv(false));
      const calls: number[] = [];
      const res = {
        redirect: () => {
          throw new Error("redirect should not be called");
        },
        sendStatus: (status: number) => {
          calls.push(status);
        },
      };

      handler({} as never, res as never);

      assert.deepEqual(calls, [204]);
    });
  });
});
