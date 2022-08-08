// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2w5bG1b2EuEpNkm3jRvxnDSSCwztwKys",
  authDomain: "duc-binh-chat-app.firebaseapp.com",
  projectId: "duc-binh-chat-app",
  storageBucket: "duc-binh-chat-app.appspot.com",
  messagingSenderId: "932632790975",
  appId: "1:932632790975:web:8b80356013eb67a6fac30a",
  measurementId: "G-RVJJDWVEWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}
