import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
//import "firebase/database";
import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4NiyLLhUEqh9LQGcHd2MczOoDWdCeIvw",
  authDomain: "expensetracker-8a40f.firebaseapp.com",
  projectId: "expensetracker-8a40f",
  storageBucket: "expensetracker-8a40f.appspot.com",
  messagingSenderId: "1068921369277",
  appId: "1:1068921369277:web:47f25dfa4bce1a2cfa7dd4",
  measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

export const useFirebase = firebase;
