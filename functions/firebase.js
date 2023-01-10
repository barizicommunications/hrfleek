const admin = require("firebase-admin");
const firebaseConfig={
  apiKey: "AIzaSyDMsPInM58uPksNu3E9iQ5EhnWBz67CPeQ",
  authDomain: "scanpal-f74da.firebaseapp.com",
  databaseURL: "https://scanpal-f74da.firebaseio.com",
  projectId: "scanpal-f74da",
  storageBucket: "scanpal-f74da.appspot.com",
  messagingSenderId: "702443834173",
  appId: "1:702443834173:web:a4148356cf434a6fda1354",
  measurementId: "G-37KL0M4ESD"
};

admin.initializeApp(firebaseConfig);


// utils
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const types = admin.firestore;

// collection references
const usersCollection = db.collection("users");
const peoplesCollection = db.collection("people");
const partnersCollection= db.collection("partners");
const transactions = db.collection("transactions");


// export utils/refs

module.exports= {
  db,
  auth,
  storage,
  types,
  usersCollection,
 peoplesCollection,
 partnersCollection,
 transactions
};