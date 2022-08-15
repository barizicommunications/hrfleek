const express = require('express');
const router = express.Router();
const firebase = require("../firebase");


// retrieve all calendars
router.get("/get/:calendar",(req, res, next)=>{
    const getAll = async () => {
        try {
          firebase.partnersCollection.doc(req.params.calendar).collection("calendars").onSnapshot((snapshot) => {
            let loadedCalendars = [];
            snapshot.forEach((doc) => {
              let loadedCalendar = doc.data();
              (loadedCalendar.id = doc.id), loadedCalendars.push(loadedCalendar);
            });
            res.status(200).json({
              calendars: loadedCalendars,
            });
          });
        } catch (error) {
          return next(error);
        }
      };
      return getAll();
})

//get single calendars
router.get("/get/:employer/single/:id",(req, res, next)=>{
    const id = req.params.id;
    const employer= req.params.employer
  const getSingleCalendar = async () => {
    await firebase.partnersCollection.doc(employer).collection("calendars").doc(id).get().then((doc)=>{
        res.status(200).json({
            calendar: doc.data(),
          });
      }).catch((error)=>{
        return next(error);
      })
  };
  return getSingleCalendar();
})
// add single calendar
router.post("/create/:employer_id",(req, res, next)=>{
    const registerCalendar = async () => {
        await firebase.partnersCollection.doc(req.params.employer_id).collection("calendars")
          .add({
            calendar_name:req.body.calendar_name,
                calendar_type:req.body.calendar_type,
                normal_payday:req.body.normal_payday,
                department:req.body.department
          })
          .then(() => {
            res.sendStatus(201);
          })
          .catch((error) => {
            return next(error);
          });
      };
      return registerCalendar(); 
})
// update calendar details
router.patch("/update/:employer_id/calendar/:id",(req, res, next)=>{
    const registerEmployee = async () => {
        await firebase.partnersCollection.doc(req.body.employer_id).collection("calendars").doc(req.params.id)
          .set({
            
            calendar_name:req.body.calendar_name,
            calendar_type:req.body.calendar_type,
            normal_payday:req.body.normal_payday,
            department:req.body.department
          })
          .then(async (response) => {
            res.status(201).send(response);
          })
          .catch((error) => {
            return next(error);
          });
      };
      return registerEmployee(); 
})

//delete calendar
router.delete("/delete/:employer_id/calendar/:id",(req, res, next)=>{
    const registerEmployee = async () => {
        await firebase.partnersCollection.doc(req.body.employer_id).collection("calendars").doc(req.params.id).delete()
          .then(async (response) => {
            res.send(response);
          })
          .catch((error) => {
            return next(error);
          });
      };
      return registerEmployee(); 
})

module.exports = router