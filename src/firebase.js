import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getMessaging} from "firebase/messaging";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDgZLdj-JGF57srxDflV1bmEJmhfOjpPv4",
    authDomain: "todo-list-a08f7.firebaseapp.com",
    projectId: "todo-list-a08f7",
    storageBucket: "todo-list-a08f7.appspot.com",
    messagingSenderId: "414003833930",
    appId: "1:414003833930:web:35b1b363a70229c7834ab3",
    measurementId: "G-HCY7B7ZP9H"
  };
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging=getMessaging(app)
export const db = getFirestore(app);
export const auth = getAuth(app);