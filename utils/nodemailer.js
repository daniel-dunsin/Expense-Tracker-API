require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      to,
      from: process.env.GMAIL_ACCOUNT,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
