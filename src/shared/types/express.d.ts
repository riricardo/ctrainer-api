export {};

declare global {
  namespace Express {
    interface Request {
      id?: string;
      auth?: {
        uid: string;
        token: Record<string, unknown>;
      };
    }
  }
}
