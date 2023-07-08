// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDW2sNb0rqAl029Ob71SABDi3e0ZXrsg4",
  authDomain: "my-movie-app-6bdf5.firebaseapp.com",
  projectId: "my-movie-app-6bdf5",
  storageBucket: "my-movie-app-6bdf5.appspot.com",
  messagingSenderId: "421648726843",
  appId: "1:421648726843:web:3c238f0dd44b6f59bd551e",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth();

export default app;
export { db, auth };
