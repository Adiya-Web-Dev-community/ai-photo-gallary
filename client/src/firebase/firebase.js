import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDnzSsHvmUiiiCt0gTA65fCHgkfIqz5RUI",
    authDomain: "aiphotosgallery.firebaseapp.com",
    projectId: "aiphotosgallery",
    storageBucket: "aiphotosgallery.appspot.com",
    messagingSenderId: "626892812847",
    appId: "1:626892812847:web:c0b153d0f2508d3e4c4cda",
    measurementId: "G-8VWMX2Z4P4"
  };

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  export {storage}