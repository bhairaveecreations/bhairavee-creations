const sendEmail = async (to, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "Bhairavee Creattions <orders@bhairaveecreattions.in>",
      to,
      subject,
      html,
    });

    console.log("Email sent:", response);
    return response;

  } catch (error) {
    console.error("Email failed:", error);
    throw error; // ✅ CRITICAL FIX
  }
};