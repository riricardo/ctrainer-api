const verifyTokenUseCase =
  ({ authProvider }: { authProvider: { verifyIdToken: (token: string) => Promise<unknown> } }) =>
  async (token: string) =>
    authProvider.verifyIdToken(token);

export default verifyTokenUseCase;
