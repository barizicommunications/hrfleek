import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDsAviWtrOkhrQQAPkZc6yY5z1bTS-u0Fk",
  authDomain: "daviemail-b68ab.firebaseapp.com",
  projectId: "daviemail-b68ab",
  storageBucket: "daviemail-b68ab.appspot.com",
  messagingSenderId: "1036524775188",
  appId: "1:1036524775188:web:f95f0d3c503832ffb9c401",
  measurementId: "G-SPZVWK424P"
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