  
  //original
  import { initializeApp } from "firebase/app";
  import { getAuth } from "firebase/auth";
  import { getFirestore } from "firebase/firestore";

 const firebaseConfig = {

   // Details of firebase on nikhil's account FitnessPulse

   apiKey: "AIzaSyALTWeY0__uD_83-FudspN4VzO58PG7vcQ",
   authDomain: "fitnesspulse-ba3b6.firebaseapp.com",
   projectId: "fitnesspulse-ba3b6",
   storageBucket: "fitnesspulse-ba3b6.appspot.com",
   messagingSenderId: "1034183332108",
   appId: "1:1034183332108:web:76daabed57168a3c55b929"
 };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

/*import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyALTWeY0__uD_83-FudspN4VzO58PG7vcQ",
  authDomain: "fitnesspulse-ba3b6.firebaseapp.com",
  projectId: "fitnesspulse-ba3b6",
  storageBucket: "fitnesspulse-ba3b6.appspot.com",
  messagingSenderId: "1034183332108",
  appId: "1:1034183332108:web:76daabed57168a3c55b929"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)*/




