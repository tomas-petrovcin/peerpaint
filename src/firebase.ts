import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA10rC9I8fArewWsB8YBLGXUMi667YFUPo",
  authDomain: "peerpaint-35c1e.firebaseapp.com",
  databaseURL:
    "https://peerpaint-35c1e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "peerpaint-35c1e",
  storageBucket: "peerpaint-35c1e.appspot.com",
  messagingSenderId: "1061113214689",
  appId: "1:1061113214689:web:407dca710a9b30154169a0",
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
