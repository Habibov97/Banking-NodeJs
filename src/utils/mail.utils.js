const nodemailer = require('nodemailer');
const config = require('../config/index');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: config.smtp.host,
  port: config.smtp.port,
  secure: config.smtp.secure,
  auth: {
    user: config.smtp.auth.user,
    pass: config.smtp.auth.pass,
  },
});

const sendMail = (from, to, subject, content) => {
  try {
    let result = transporter.sendMail({
      from,
      to,
      subject,
      html: content,
    });

    return result;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  sendMail,
};
