const { getAuth } = require("./firebase-admin");

const verifyIdToken = async (token) => {
  const auth = getAuth();
  return auth.verifyIdToken(token);
};

module.exports = {
  verifyIdToken,
};
