// mailer.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

async function sendWelcomeEmail(toEmail, username, otp) {
  const mailOptions = {
    from: `"Your App Name" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: 'Welcome to Our App!',
    html: `<h1>Welcome, ${username}!</h1><p>Thanks for registering with us.</p><p>${otp}</p>`,
  };

  return await transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeEmail };