import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

let emulator = false;

const firebaseConfig = {
  apiKey: 'AIzaSyDgQApdVZbg7OPmtrsOAf5U5lsFNu5u21g',
  authDomain: 'mangabai.firebaseapp.com',
  projectId: 'mangabai',
  storageBucket: 'mangabai.appspot.com',
  messagingSenderId: '956180902451',
  appId: '1:956180902451:web:9ccce705e32ac4dfef6946',
  measurementId: 'G-854K4MFB8T'
};

export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);

if (process.env.NODE_ENV === 'development' && !emulator) {
  emulator = true;
  try {
    connectDatabaseEmulator(db, 'localhost', 9000);
    connectAuthEmulator(auth, 'http://localhost:9099');
  } catch (error) {}
}
