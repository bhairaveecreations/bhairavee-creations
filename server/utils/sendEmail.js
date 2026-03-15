const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "gmail",

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }

});

const sendEmail = async (to, subject, html) => {

  await transporter.sendMail({
    from: `"Bhairvee Creations" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html
  });

};

module.exports = sendEmail;