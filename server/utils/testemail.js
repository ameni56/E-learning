const nodemailer = require("nodemailer");

const sendTestEmail = async () => {
  try {
    // Create a transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: process.env.USER,
      to: "amenihajri74@gmail.com", // Replace with the recipient's email address
      subject: "Test Email",
      text: "This is a test email sent using Nodemailer.",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

// Call the function to send the test email
sendTestEmail();
