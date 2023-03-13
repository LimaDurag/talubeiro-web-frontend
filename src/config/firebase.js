// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCT6PqKbBW_qV6Zi46qz3fvr4jHskZh6t8",
  authDomain: "talubeiro-official.firebaseapp.com",
  projectId: "talubeiro-official",
  storageBucket: "talubeiro-official.appspot.com",
  messagingSenderId: "1004922212067",
  appId: "1:1004922212067:web:33bb857e0624ef22c6ffd6",
  measurementId: "G-K7KQMMLBZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {app, analytics};
