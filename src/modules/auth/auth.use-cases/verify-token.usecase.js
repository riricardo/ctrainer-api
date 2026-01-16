const verifyTokenUseCase = ({ authProvider }) => async (token) =>
  authProvider.verifyIdToken(token);

module.exports = verifyTokenUseCase;
