import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBpopVWfxNqsezWTwlSafFpCy_RTEjLyU8",
  authDomain: "blog-project-13ab6.firebaseapp.com",
  projectId: "blog-project-13ab6",
  storageBucket: "blog-project-13ab6.appspot.com",
  messagingSenderId: "588361819359",
  appId: "1:588361819359:web:197bcc22fde98083b4f56a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
