import { verifyIdToken } from "../../infrastructure/firebase/auth.provider";
import { AuthProvider } from "./auth.types";

const createAuthProvider = (): AuthProvider => ({
  verifyIdToken,
});

export { createAuthProvider };
