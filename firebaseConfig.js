// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6gP0vll5K0IVhtevOqZgfuXSOSL27NQQ",
  authDomain: "mamatgunshop-1bf17.firebaseapp.com",
  databaseURL: "https://mamatgunshop-1bf17-default-rtdb.firebaseio.com",
  projectId: "mamatgunshop-1bf17",
  storageBucket: "mamatgunshop-1bf17.appspot.com",
  messagingSenderId: "180739610098",
  appId: "1:180739610098:web:94632094d2120d02c5076b",
  measurementId: "G-GEWS6R6SYN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app)
const db = getDatabase(app);

export { auth, db, database };
