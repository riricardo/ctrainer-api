import assert from "node:assert/strict";
import { describe, it } from "node:test";
import requireAuth from "middleware/requireAuth";
import AppError from "shared/errors/AppError";
import { AppErrorCode } from "shared/errors/error-codes";
import { AuthProvider } from "modules/auth/auth.types";

type MockRequest = {
  headers: Record<string, string | undefined>;
  auth?: { uid: string; token: Record<string, unknown> };
};

const createResponse = () => ({});

const createNext = () => {
  const calls: unknown[] = [];
  const next = (value?: unknown) => {
    calls.push(value);
  };

  return { next, calls };
};

const assertNextAppErrorCode = (
  calls: unknown[],
  expectedCode: AppErrorCode
) => {
  assert.equal(calls.length, 1);
  assert.ok(calls[0] instanceof AppError);
  assert.equal(calls[0].code, expectedCode);
};

describe("requireAuth", () => {
  it("attaches auth info when the bearer token is valid", async () => {
    const authProvider: AuthProvider = {
      verifyIdToken: async (token) => ({ uid: "user-123", rawToken: token }),
    };
    const middleware = requireAuth(authProvider);
    const req: MockRequest = {
      headers: { authorization: "Bearer valid-token" },
    };
    const { next, calls } = createNext();

    await middleware(req as never, createResponse() as never, next as never);

    assert.deepEqual(req.auth, {
      uid: "user-123",
      token: { uid: "user-123", rawToken: "valid-token" },
    });
    assert.deepEqual(calls, [undefined]);
  });

  it("rejects requests without a bearer token", async () => {
    const authProvider: AuthProvider = {
      verifyIdToken: async () => ({ uid: "unused" }),
    };
    const middleware = requireAuth(authProvider);
    const req: MockRequest = { headers: {} };
    const { next, calls } = createNext();

    await middleware(req as never, createResponse() as never, next as never);

    assertNextAppErrorCode(calls, AppErrorCode.AuthRequired);
  });

  it("maps provider failures to invalid token", async () => {
    const authProvider: AuthProvider = {
      verifyIdToken: async () => {
        throw new Error("bad token");
      },
    };
    const middleware = requireAuth(authProvider);
    const req: MockRequest = {
      headers: { authorization: "Bearer invalid-token" },
    };
    const { next, calls } = createNext();

    await middleware(req as never, createResponse() as never, next as never);

    assertNextAppErrorCode(calls, AppErrorCode.InvalidToken);
  });
});
