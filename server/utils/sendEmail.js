const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "Bhairvee <onboarding@resend.dev>", // works without domain verification
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);
  } catch (error) {
    console.error("Email failed:", error);
    throw error; // let caller know if it failed
  }
};

module.exports = sendEmail;