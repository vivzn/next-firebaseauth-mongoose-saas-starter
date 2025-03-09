// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp, } from "firebase/app";
import { GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgOttjtMla3WhAj_AsqOhboFJuGs4UPk8",
    authDomain: "xxx2-f6971.firebaseapp.com",
    projectId: "xxx2-f6971",
    storageBucket: "xxx2-f6971.firebasestorage.app",
    messagingSenderId: "1095585891207",
    appId: "1:1095585891207:web:9f27ea0b39cb1125aac922"
};

// Initialize Firebase
const providerGoogle = new GoogleAuthProvider();
const providerFacebook = new FacebookAuthProvider();

export { providerFacebook, providerGoogle, firebaseConfig }