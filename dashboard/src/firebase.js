import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAmWu6W4tUFGBMUovSGOa229Xw7IfURXAs",
  authDomain: "hrfleek-84599.firebaseapp.com",
  projectId: "hrfleek-84599",
  storageBucket: "hrfleek-84599.appspot.com",
  messagingSenderId: "793784062223",
  appId: "1:793784062223:web:fc39e62e6bcdda35846e7a",
  measurementId: "G-FKFGXRVHRB"
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