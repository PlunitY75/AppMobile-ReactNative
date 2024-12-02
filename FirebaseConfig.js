import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAsrp2p5S7-Eg3VXsrnsCnYrP3ldkYtpQM",
    authDomain: "mediconnect-d4674.firebaseapp.com",
    projectId: "mediconnect-d4674",
    storageBucket: "mediconnect-d4674.appspot.com",
    messagingSenderId: "930644659685",
    appId: "1:930644659685:web:56b23e5a5e2d31fd18b30c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);

