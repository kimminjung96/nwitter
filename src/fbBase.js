import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD73meZug5hja6IDWKqpNkiWnQan0-N0g8",
  authDomain: "nwitter-38861.firebaseapp.com",
  projectId: "nwitter-38861",
  storageBucket: "nwitter-38861.appspot.com",
  messagingSenderId: "300351076136",
  appId: "1:300351076136:web:b80344c266ec1eab1cc21d",
};
//export default firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
