const express = require('express');
const { sendEmail } = require('../utils/mailer'); 

const router = express.Router();

router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Missing required fields: to, subject, text');
  }

  try {
    await sendEmail(to, subject, text);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});

module.exports = router;
