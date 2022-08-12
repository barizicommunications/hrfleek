const express = require("express");
const router = express.Router();
const firebase = require("../firebase");
//register new user
router.post("/register", (req, res, next) => {
  const register = async () => {
    await firebase.auth
      .createUser({ email: req.body.email, password: req.body.password })
      .then((response) => {
        res.status(201).send({ user: response });
      })
      .catch((e) => {
        return next(e);
      });
  };
  return register();
});
//get new user by email
router.get("/getuser/:email", (req, res, next) => {
  const getUserByEmail = async () => {
    firebase.auth
      .getUserByEmail(req.params.email)
      .then((userRecord) => {
        res.status(200).json({
          user: userRecord,
        });
      })
      .catch((error) => {
        return next(error);
      });
  };
  return getUserByEmail();
});

module.exports = router;
