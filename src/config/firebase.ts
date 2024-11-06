// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7kGZPrlHio1wHaq37slKXRj2sJCCfA5A",
  authDomain: "passiton-f7566.firebaseapp.com",
  projectId: "passiton-f7566",
  storageBucket: "passiton-f7566.appspot.com",
  messagingSenderId: "906833448827",
  appId: "1:906833448827:web:481ed4296542b0b3ccf7de"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = initializeAuth(firebase_app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
export const storage = getStorage(firebase_app);