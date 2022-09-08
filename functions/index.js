const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const people = require("./routes/people");
const auth =require('./routes/auth');
const clients =require('./routes/clients');
const mail =require('./routes/mail')


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
//route handlers
app.use("/auth", auth);
app.use("/people", people);
app.use("/clients",clients);
app.use("/mail",mail)
//error handlers
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

//app cloud function wrappers
exports.barizi = functions.https.onRequest(app);



