const express =require("express");
const nodemailer = require("nodemailer");
const router =express.Router()

router.post('/',(req,res,next)=>{
    const sendMail =async()=>{
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "wochieng@barizicommunications.com", // generated ethereal user
      pass: "Qur27861", // generated ethereal password
    },
  });

  // send mail with defined transport object
   const mailOptions = {
     from: 'wochieng@barizicommunications.com', // sender address
     to: 'ochiengwarren10@gmail.com', // list of receivers
     subject: 'Test Email', // Subject line
     html: '<p>Your html here</p>'// plain text body
   };

   transporter.sendMail(mailOptions, function (err, info) {
      if(err)
        return next(err)
      else
        res.status(201).send(info)

   });
    }

    return sendMail()

})

module.exports =router