const verifyTokenUseCase =
  ({ authProvider }: { authProvider: { verifyIdToken: (token: string) => Promise<{ uid: string } & Record<string, unknown>> } }) =>
  async (token: string) =>
    authProvider.verifyIdToken(token);

export default verifyTokenUseCase;
