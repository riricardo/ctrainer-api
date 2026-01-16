import { getAuth } from "./firebase-admin";

const verifyIdToken = async (
  token: string
): Promise<{ uid: string } & Record<string, unknown>> => {
  const auth = getAuth();
  return auth.verifyIdToken(token);
};

export { verifyIdToken };
