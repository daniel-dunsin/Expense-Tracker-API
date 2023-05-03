require('dotenv').config();
const nodemailer = require('nodemailer');
const formatDate = require('./formatDate');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_ACCOUNT,
    pass: process.env.GMAIL_PASS,
  },
});

const sendMail = async (to, subject, transactions) => {
  try {
    await transporter.sendMail({
      to,
      from: process.env.GMAIL_ACCOUNT,
      subject,
      html: `${transactions
        .map((transaction) => {
          return `<p>Date => ${formatDate(
            transaction.createdAt
          )}</p>\nIssued By => ${
            transaction.owner.username
          }\n<p>Description => ${
            transaction.description
          }</p>\n<p>Transaction Type => ${transaction.transactionType.toUpperCase()}</p>\n<p>Amount=> ${
            transaction.currency
          } ${transaction.amount}</p>`;
        })
        .join('\n\n')}`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendMail;
