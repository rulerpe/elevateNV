const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
admin.initializeApp(functions.config().firebase);
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});
const APP_NAME = 'elevateNV';

exports.sendEmailOnFeedbackSubmit = functions.firestore
  .document('feedbacks/{feedbackID}')
  .onCreate(event => {
    var feedbackData = event.data.data()
    const mailOptions = {
      from: `${APP_NAME} <noreply@elevateNV.com>`,
      to: 'peter.chen424321@gmail.com',
      subject: `New feedback has submitted from ${feedbackData.name}`,
      html: `<div>
              <p>Name: ${feedbackData.name}</p>
              <p>Phone: ${feedbackData.phone}</p>
              <p>Email: ${feedbackData.email}</p>
              <p>Comment: ${feedbackData.comment}</p>
            </div>`
    }
    return mailTransport.sendMail(mailOptions)
      .then(()=>{
        console.log('email is sent')
      })
      .catch(error => {
        console.error(error)
      })
  })
