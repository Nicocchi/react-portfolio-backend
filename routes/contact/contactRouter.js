require('dotenv').config();
const express = require('express');
const contactRouter = express.Router({mergeParams: true});

const nodemailer = require('nodemailer');

contactRouter.post('/', (req, res) => {

  // Set body
  const htmlEmail = `
    <h1>${req.body.subject}</h1>
    <h3>Contact Details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `

  // create email
  let transporter = nodemailer.createTransport({
      service: `${process.env.EMAIL_SERVICE}`,
      auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`
      }
  });

  // email options
  let mailOptions = {
      from: `${process.env.EMAIL_ADDRESS}`,
      to: `${process.env.USER_EMAIL_ADDRESS}`,
      subject: req.body.subject,
      text: req.body.message,
      html: htmlEmail
  };

  // send email
  transporter.sendMail(mailOptions, function(error, info){
      if(error){
          res.status(500).json({message: "Could not send email", error: error})
      }else{
          res.status(200).json({message: "Email sent successfully!"})
      }
  });
});

module.exports = contactRouter;
