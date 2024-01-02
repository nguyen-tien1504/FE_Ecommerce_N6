// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3VWfmeuM1NhA71B0NoKLgv7n_x4OIk_g",
  authDomain: "test-6daef.firebaseapp.com",
  projectId: "test-6daef",
  storageBucket: "test-6daef.appspot.com",
  messagingSenderId: "683282204358",
  appId: "1:683282204358:web:ca7540c0f96544fe2039c7",
  measurementId: "G-PKWNFH1EY3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);