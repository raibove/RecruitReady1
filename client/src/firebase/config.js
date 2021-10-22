// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlVe2pHP4dM5-WlBi3eoV4K7QBFnJroLw",
  authDomain: "voice-recorder-a20fe.firebaseapp.com",
  projectId: "voice-recorder-a20fe",
  storageBucket: "voice-recorder-a20fe.appspot.com",
  messagingSenderId: "554615088969",
  appId: "1:554615088969:web:07e796c4ddcb945da79c98",
  measurementId: "G-3NDKP1WEV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
