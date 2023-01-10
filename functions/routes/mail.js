const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const { createPDF } = require("./createPDF");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

router.post("/", (req, res, next) => {
  const sendMail = async () => {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "wochieng@barizicommunications.com", // generated ethereal user
        pass: "Yaw61537", // generated ethereal password
      },
    });

    // send mail with defined transport object
    const mailOptions = {
      from: "wochieng@barizicommunications.com", // sender address
      to: "ochiengwarren10@gmail.com", // list of receivers
      subject: "Test Email", // Subject line
      html: '<p style="color:red;">Your html here</p>', // plain text body
    };

    transporter.sendMail(mailOptions, function (err, info) {
      if (err) return next(err);
      else res.status(201).send(info);
    });
  };

  return sendMail();
});

let emailClient = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "wochieng@barizicommunications.com", // generated ethereal user
    pass: "Yaw61537", // generated ethereal password
  },
});

const createHTMLToSend = (path, replacements) => {
  let html = fs.readFileSync(path, {
    encoding: "utf-8",
  });
  let template = handlebars.compile(html);

  let htmlToSend = template(replacements);

  return htmlToSend;
};

router.post('/send',(req,res,next)=>{
  const sendPDF = async () => {
    const emailPath = path.resolve("./routes/email-templates", "payslip.html");
  
    const replacements = {
      name: "Warren",
      date: new Date().toDateString(),
    };
  
    let htmlToSend = createHTMLToSend(emailPath, replacements);
    let pdfOutput = await createPDF();

    const mailOptions = {
      from: "wochieng@barizicommunications.com", // sender address
      to: "ochiengwarren10@gmail.com", // list of receivers
      subject: "Your Payslip", // Subject line
      html: htmlToSend, // plain text body
      attachments: [{ path: pdfOutput }],
    };
  
  emailClient.sendMail(mailOptions, function (err, info) {
    if (err) return next(err);
    else res.status(201).send(info);
  });
  };
  return sendPDF()

})

module.exports = router;
