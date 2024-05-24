
import admin from 'firebase-admin';

const init = (fb, config) => {
  if (process.env.NODE_ENV === 'development') {
    process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
    process.env.FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099';
  }

  if (!fb.apps.length) {
    fb.initializeApp(config);
  }
}

if (process.env.NODE_ENV !== 'development') {
  init(admin, {
    credential: admin.credential.applicationDefault(),
    projectId: 'noonahk',
  });
} else {
  const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);
  init(admin, { projectId: 'noonahk', credential: admin.credential.cert(serviceAccount) })
}

const db = admin.firestore();

export { db }