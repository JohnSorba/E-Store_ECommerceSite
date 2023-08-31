import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAFHx-hoK6-ogQPckh1-M3BZVSDW3Wadv8 ",
  authDomain: "e-store-f957f.firebaseapp.com",
  projectId: "e-store-f957f",
  storageBucket: "e-store-f957f.appspot.com",
  messagingSenderId: "633284440662",
  appId: "1:633284440662:web:632ec5d84b9583c41f41f7",
  databaseURL:
    "https://e-store-f957f-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
