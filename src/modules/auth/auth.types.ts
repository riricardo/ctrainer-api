export type AuthToken = { uid: string } & Record<string, unknown>;

export interface AuthProvider {
  verifyIdToken(token: string): Promise<AuthToken>;
}
