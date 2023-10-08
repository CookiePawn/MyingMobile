import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA54IRwU3rU6aiv0h_wPJ6xkqtkyPdL-9M",
  authDomain: "mying-25feb.firebaseapp.com",
  projectId: "mying-25feb",
  storageBucket: "mying-25feb.appspot.com",
  messagingSenderId: "885871958951",
  appId: "1:885871958951:web:8f9eb158ba6c7c9fb1f482",
  measurementId: "G-D6BLCEH2YC"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db