const express = require('express');
const router = express.Router();
const firebase = require("../firebase");


// retrieve all users
router.get("/get/:employer",(req, res, next)=>{
    const getAll = async () => {
        try {
          firebase.partnersCollection.doc(req.params.employer).collection("employees").onSnapshot((snapshot) => {
            let loadedEmployees = [];
            snapshot.forEach((doc) => {
              let loadedEmployee = doc.data();
              (loadedEmployee.id = doc.id), loadedEmployees.push(loadedEmployee);
            });
            res.status(200).json({
              people: loadedEmployees,
            });
          });
        } catch (error) {
          return next(error);
        }
      };
      return getAll();
})

//get single employee
router.get("/get/:employer/single/:id",(req, res, next)=>{
    const id = req.params.id;
    const employer= req.params.employer
  const getSingleEmployee = async () => {
    await firebase.partnersCollection.doc(employer).collection("employees").doc(id).get().then((doc)=>{
        res.status(200).json({
            employee: doc.data(),
          });
      }).catch((error)=>{
        return next(error);
      })
  };
  return getSingleEmployee();
})
// add single user
router.post("/create/:employer_id",(req, res, next)=>{
    const registerEmployee = async () => {
        await firebase.partnersCollection.doc(req.params.employer_id).collection("employees")
          .add({
                bank_name:req.body.bank_name,
                account_number:req.body.account_number,
                accountName:req.body.accountName,
                bank_branch:req.body.bank_branch,       
                full_name:req.body.full_name,
                email:req.body.email,
                phone_number:req.body.phone_number,
                department:req.body.department,
                designation:req.body.designation,
                pay_rate:req.body.pay_rate,
                basic_pay:req.body.basic_pay,
                deductions:req.body.deductions,
                net_pay:req.body.net_pay
          })
          .then(async (employee) => {
            res.status(201).send(employee);
          })
          .catch((error) => {
            return next(error);
          });
      };
      return registerEmployee(); 
})
// update employee details
router.patch("/update/:employer_id/employee/:id",(req, res, next)=>{
    const registerEmployee = async () => {
        await firebase.partnersCollection.doc(req.body.employer_id).collection("employees").doc(req.params.id)
          .set({
            
                bank_name:req.body.bank_name,
                account_number:req.body.account_number,
                accountName:req.body.accountName,
                bank_branch:req.body.bank_branch,       
                full_name:req.body.full_name,
                department:req.body.department,
                designation:req.body.designation,
                pay_rate:req.body.pay_rate,
                hours_worked:req.body.hours_worked,
                basic_pay:req.body.basic_pay,
                deductions:[],
                net_pay:req.body.net_pay
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
//add users in bulk
router.post("/",(req, res, next)=>{
    
})
//export users
router.post("/",(req, res, next)=>{
    
})
//delete employee
router.delete("/delete/:employer_id/employee/:id",(req, res, next)=>{
    const registerEmployee = async () => {
        await firebase.partnersCollection.doc(req.body.employer_id).collection("employees").doc(req.params.id).delete()
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