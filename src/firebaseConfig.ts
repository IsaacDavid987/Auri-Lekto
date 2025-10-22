// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkB2TmBsBI5m22ZuFUTJ06FiV9VUbE6Ow",
  authDomain: "auri-lekto.firebaseapp.com",
  projectId: "auri-lekto",
  storageBucket: "auri-lekto.firebasestorage.app",
  messagingSenderId: "233983106393",
  appId: "1:233983106393:web:ad9fa3950ea1777ff9c048",
  measurementId: "G-8C87EWTHBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);