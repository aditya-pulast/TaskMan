// const nodemailer = require('nodemailer');

// async function sendEmail(email){
//   console.log("mbdhfjdklfjbhdsn");
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.com",
//     port: 465,
//     secure: true,
//     service: 'gmail',
//     auth: {
//       user: 'feyona6826@gmail.com',
//       pass: 'dzfrejnooozrsmac'
//     },
//     tls : {
//       rejectUnauthorized : false
//     }
//  });
 
//  const mailOptions = await transporter.sendMail({
//     from: 'feyona6826@gmail.com',
//     to: email, 
//     cc: 'feyona6826@gmail.com',
//     bcc: 'feyona6826@gmail.com',
//     subject: "successfull", 
//     text: "you have registered" 
//   });

// }
// async function sendCreationEmail(email) {
//   const subject = 'Account Creation Confirmation';
//   const text = 'Your account has been successfully created.';
//   await sendEmail(email, subject, text);
// }
// async function sendDeletionEmail(email) {
//   const subject = 'Account Deletion Confirmation';
//   const text = 'Your account has been successfully deleted.';
//   await sendEmail(email, subject, text);
// }

// module.exports = {
//   sendEmail,
//   sendDeletionEmail,
//   sendCreationEmail
// }
const nodemailer = require('nodemailer');

async function sendEmail(email, subject, text) {
  console.log('Sending email to:', email);
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: 'feyona6826@gmail.com',
      pass: 'dzfrejnooozrsmac'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  const mailOptions = await transporter.sendMail({
    from: 'feyona6826@gmail.com',
    to: email,
    subject,
    text
  });

  console.log('Email sent:', mailOptions);
}

async function sendCreationEmail(email) {
  const subject = 'Account Creation Confirmation';
  const text = 'Your account has been successfully created.';
  await sendEmail(email, subject, text);
}

async function sendDeletionEmail(email) {
  const subject = 'Account Deletion Confirmation';
  const text = 'Your account has been successfully deleted.';
  await sendEmail(email, subject, text);
}

module.exports = {
  sendCreationEmail,
  sendDeletionEmail
};
