import { verifyIdToken } from "../../../infrastructure/firebase/auth.provider";

const createAuthProvider = () => ({
  verifyIdToken,
});

export { createAuthProvider };
