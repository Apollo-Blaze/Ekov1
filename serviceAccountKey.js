// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3Ei3egmwq5ot0XezsrH_QztVX5ha6Xug",
  authDomain: "eko2-4e982.firebaseapp.com",
  projectId: "eko2-4e982",
  storageBucket: "eko2-4e982.appspot.com",
  messagingSenderId: "914262789292",
  appId: "1:914262789292:web:705b48e923d458940de309",
  measurementId: "G-9K3HTNX12N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);