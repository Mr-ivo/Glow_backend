const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const sendEmail = async (userEmail, userName, message) => {
  if (!userEmail || !userName || !message) {
    console.error('Invalid email parameters.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
    subject: `New Contact from ${userName}`, 
    text: `You have a new message from ${userName} (${userEmail}):\n\n${message}`, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

module.exports = { sendEmail };
