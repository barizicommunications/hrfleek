const express =require("express");
const tesseract = require("node-tesseract-ocr")
const router = express.Router()


router.get("/",(req,res,next)=>{
    const img = "https://tesseract.projectnaptha.com/img/eng_bw.png"
    const config = {
        lang: "eng",
        oem: 1,
        psm: 3,
      }
      
tesseract
  .recognize(img, config)
  .then((text) => {
    res.send(text)
  })
  .catch((error) => {
   return next(error)
  })

})

module.exports =router