import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD2iFFpkoxZgB9MBwtqEmE5I-62-luJl0o",
  authDomain: "weather-d992c.firebaseapp.com",
  projectId: "weather-d992c",
  storageBucket: "weather-d992c.appspot.com",
  messagingSenderId: "759553665176",
  appId: "1:759553665176:web:453904ebb9c225b541c8ed",
  measurementId: "G-CW9ER9MQL6"
};

const app = initializeApp(firebaseConfig);

export {app};