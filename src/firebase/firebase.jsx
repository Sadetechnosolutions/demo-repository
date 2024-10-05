// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { notification } from "antd";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDEXQIi0KUgIwurBitYRN0QIco2fEIYZg",
  authDomain: "destiny-2a8c3.firebaseapp.com",
  projectId: "destiny-2a8c3",
  storageBucket: "destiny-2a8c3.appspot.com",
  messagingSenderId: "1081948057931",
  appId: "1:1081948057931:web:7f87ff176a4ac18a3f78ce",
  measurementId: "G-B9N98DCR6W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

export const fetchToken = async()=>{
   const permission =  await Notification.requestPermission()
   console.log(permission)
}