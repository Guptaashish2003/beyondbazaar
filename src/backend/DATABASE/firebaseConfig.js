import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.APIKEY,

  authDomain: process.env.AUTHDOMAIN,

  projectId: process.env.PROJECT_ID,

  storageBucket: process.env.STORAGE_BUCKET,

  messagingSenderId: process.env.MESSAGING_ID,

  appId: process.env.APP_ID

};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
