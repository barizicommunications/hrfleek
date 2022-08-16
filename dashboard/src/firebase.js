import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDMsPInM58uPksNu3E9iQ5EhnWBz67CPeQ",
    authDomain: "scanpal-f74da.firebaseapp.com",
    databaseURL: "https://scanpal-f74da.firebaseio.com",
    projectId: "scanpal-f74da",
    storageBucket: "scanpal-f74da.appspot.com",
    messagingSenderId: "702443834173",
    appId: "1:702443834173:web:a4148356cf434a6fda1354",
    measurementId: "G-37KL0M4ESD"
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
  capture
};