import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB0CO9PloCBIieVifCPi5ptBibNTRj4fZk",
  authDomain: "test-lms-addbase.firebaseapp.com",
  projectId: "test-lms-addbase",
  storageBucket: "test-lms-addbase.appspot.com",
  messagingSenderId: "770512950395",
  appId: "1:770512950395:web:9ad0a7fe3caadb35c53ede",
  measurementId: "G-WC1HFBNBDH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
