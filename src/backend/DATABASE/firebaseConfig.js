// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "beyondbazaar.firebaseapp.com",
  projectId: "beyondbazaar",
  storageBucket: "beyondbazaar.appspot.com",
  messagingSenderId: process.env.MESSAGING_ID,
  appId: process.env.APP_ID
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);