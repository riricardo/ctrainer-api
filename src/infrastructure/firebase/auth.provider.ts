import { getAuth } from "./firebase-admin";

const verifyIdToken = async (token: string) => {
  const auth = getAuth();
  return auth.verifyIdToken(token);
};

export { verifyIdToken };
