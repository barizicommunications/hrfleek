const admin = require("firebase-admin");

admin.initializeApp(process.env.firebaseConfig);


// utils
const db = admin.firestore();
const auth = admin.auth();
const storage = admin.storage();
const types = admin.firestore;

// collection references
const usersCollection = db.collection("users");
const peoplesCollection = db.collection("people");


// export utils/refs

module.exports= {
  db,
  auth,
  storage,
  types,
  usersCollection,
 peoplesCollection
};