// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClKiAKE3wbwZIg3r6hiU7-VsELBWXyjdA",
  authDomain: "moneytor-dondy.firebaseapp.com",
  projectId: "moneytor-dondy",
  storageBucket: "moneytor-dondy.appspot.com",
  messagingSenderId: "119808015056",
  appId: "1:119808015056:web:33fbc980e313a15bd63cd5",
  measurementId: "G-0ZBGV31TD1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
