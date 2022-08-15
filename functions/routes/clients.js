const express = require("express");
const router = express.Router();
const firebase = require("../firebase");

// retrieve all clients
router.get("/get/all", (req, res, next) => {
  const getAllClients = async () => {
    try {
      firebase.partnersCollection.onSnapshot((snapshot) => {
        let loadedPartners = [];
        snapshot.forEach((doc) => {
          let loadedPartner = doc.data();
          (loadedPartner.id = doc.id), loadedPartners.push(loadedPartner);
        });
        res.status(200).json({
          partners: loadedPartners,
        });
      });
    } catch (error) {
      return next(error);
    }
  };
  return getAllClients();
});

// get single client
router.get("/get/:partnersId", (req, res, next) => {
  const partnersId = req.params.partnersId;
  const getSingleMerchant = async () => {
    await firebase.partnersCollection.doc(partnersId).get().then((doc)=>{
        res.status(200).json({
            partner: doc.data(),
          });
      }).catch((error)=>{
        return next(error);
      })
  };
  return getSingleMerchant();
});
// add single client
router.post("/create", (req, res, next) => {
  const registerpartners = async () => {
    await firebase.partnersCollection
      .add({
        company_name: req.body.company_name,
        company_email: req.body.company_email,
        number_of_employees: req.body.number_of_employees,
        company_phone: req.body.company_phone,
        address: req.body.address
      })
      .then(async (partner) => {
        res.status(201).send(partner);
      })
      .catch((error) => {
        return next(error);
      });
  };
  return registerpartners();
});
// update client details
router.patch("/update/:id", (req, res, next) => {
    const updatePartners = async () => {
        await firebase.partnersCollection.doc(req.params.id)
          .update({
            company_name: req.body.company_name,
            company_email: req.body.company_email,
            number_of_employees: req.body.number_of_employees,
            company_phone: req.body.company_phone,
            address: req.body.address
          })
          .then(async (response) => {
            res.status(201).send(response);
          })
          .catch((error) => {
            return next(error);
          });
      };
      return updatePartners();
});
// delete client
router.delete("/delete/:id", (req, res, next) => {
    const updatePartners = async () => {
        await firebase.partnersCollection.doc(req.params.id)
          .delete()
          .then(async (response) => {
            res.status(201).send(response);
          })
          .catch((error) => {
            return next(error);
          });
      };
      return updatePartners();
});

module.exports = router;
