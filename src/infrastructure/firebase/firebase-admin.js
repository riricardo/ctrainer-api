const admin = require("firebase-admin");
const env = require("../../config/env");

const initFirebaseAdmin = () => {
  if (admin.apps.length) {
    return admin.app();
  }

  const hasCert =
    env.firebase.projectId &&
    env.firebase.clientEmail &&
    env.firebase.privateKey;

  if (hasCert) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: env.firebase.projectId,
        clientEmail: env.firebase.clientEmail,
        privateKey: env.firebase.privateKey,
      }),
    });
  } else {
    admin.initializeApp();
  }

  return admin.app();
};

const getAuth = () => {
  initFirebaseAdmin();
  return admin.auth();
};

module.exports = {
  initFirebaseAdmin,
  getAuth,
};
