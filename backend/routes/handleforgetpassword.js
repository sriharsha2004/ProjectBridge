const express = require("express");
const router = express.Router();
const usermodel = require("../models/signupSchema");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

router.post("/sendverificationmail",(req,res)=>{
    const mail = req.body.mail;
    usermodel.findOne({mailId : mail})
    .then(user => {
        if(!user){
            res.json("Not a valid user");
        }
        console.log(user);
       const token = jwt.sign({id : user._id} , process.env.JWT_SECRET,{expiresIn : "300s"});

       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_ID,
          pass: process.env.MAIL_PWD
        }
      });
      
      var mailOptions = {
        from: process.env.MAIL_ID,
        to: [req.body.mail],
        subject: 'ProjectBridge Reset Your password',
        text: `http://localhost:3000/resetpwd/${user._id}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          res.json("Successfully sent");
        }
      });
    })
})

module.exports = router;
