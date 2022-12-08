import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEkWeT_c8szA-OpUHJb8LHcmfk9isLH18",
  authDomain: "fir-38ba4.firebaseapp.com",
  projectId: "fir-38ba4",
  storageBucket: "fir-38ba4.appspot.com",
  messagingSenderId: "1015772554574",
  appId: "1:1015772554574:web:3e523ab0a1907120162a1f",
  measurementId: "G-36EYYE2X8R"
};
firebase.initializeApp(firebaseConfig);

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const types = firebase.firestore;

const arrayUnion = firebase.firestore.FieldValue.arrayUnion();

// collection references
const usersCollection = db.collection("users");
const businessCollection = db.collection("clients");
const adminCollections =db.collection("admins");
const banksCollection =db.collection("banks");
const capture = firebase.auth

// export utils/refs

export {
  db,
  auth,
  storage,
  types,
  arrayUnion,
  usersCollection,
  businessCollection,
  capture,
  adminCollections,
  banksCollection
};