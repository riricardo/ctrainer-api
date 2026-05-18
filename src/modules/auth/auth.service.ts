import { verifyIdToken } from "infrastructure/firebase/auth.provider";
import { AuthProvider } from "modules/auth/auth.types";

const createAuthProvider = (): AuthProvider => ({
  verifyIdToken,
});

export { createAuthProvider };
