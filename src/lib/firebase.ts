import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHoFRE1mcJbq2eaY6e-ZVg4IRL5nsUiQ0",
  authDomain: "ecodrop-app-b6490.firebaseapp.com",
  projectId: "ecodrop-app-b6490",
  storageBucket: "ecodrop-app-b6490.firebasestorage.app",
  messagingSenderId: "79318824128",
  appId: "1:79318824128:web:7f6e2392ea5ede98592925",
  measurementId: "G-M752M30FQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Analytics
export const analytics = getAnalytics(app);

export default app;
