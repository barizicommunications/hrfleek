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
      user: "info@hrfleek.com", // generated ethereal user
      pass: "Duw51092", // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <info@hrfleek.com>', // sender address
    to: "ochiengwarren10@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "thisi this is the test from hrfleek?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  res.status(201).send(info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    }

    return sendMail()

})

module.exports =router