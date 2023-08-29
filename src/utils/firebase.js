// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBE9qx-Bn8WJQikZuaaEyaNbmEfqjVi-9U",
  authDomain: "netflixgpt-29d13.firebaseapp.com",
  projectId: "netflixgpt-29d13",
  storageBucket: "netflixgpt-29d13.appspot.com",
  messagingSenderId: "336933412398",
  appId: "1:336933412398:web:823cb089b152a8ea1bc9bf",
  measurementId: "G-B7JX7MP28B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
