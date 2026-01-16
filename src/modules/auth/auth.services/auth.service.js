const firebaseAuthProvider = require("../../../infrastructure/firebase/auth.provider");

const createAuthProvider = () => ({
  verifyIdToken: firebaseAuthProvider.verifyIdToken,
});

module.exports = {
  createAuthProvider,
};
