import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAr3rpuMZw86T7xpzsdFsU_GpQHBGN4frA",
    authDomain: "givealittlesd.firebaseapp.com",
    projectId: "givealittlesd",
    storageBucket: "givealittlesd.appspot.com",
    messagingSenderId: "943810278792",
    appId: "1:943810278792:web:5526ce92fc9fff398bf63d",
    measurementId: "G-9T109NJ81D"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);