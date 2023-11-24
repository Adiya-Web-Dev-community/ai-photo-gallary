// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU822CYVvhIbcOgxCbn1pZ-q_nBDX9B4k",
  authDomain: "ai-face-recognition-502d8.firebaseapp.com",
  projectId: "ai-face-recognition-502d8",
  storageBucket: "ai-face-recognition-502d8.appspot.com",
  messagingSenderId: "1075180731089",
  appId: "1:1075180731089:web:4177f82de9b6aa0e8923f0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;