
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    host: "erronblack72001@gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "invincible72001@gmail.com",
      pass: "V@rshanj72001",
    },
  });

  const mailOptions = {
    from: "invincible72001@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: https://example.com/reset-password?token=${resetToken}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Error sending password reset email");
  }
};

module.exports = { generateToken, sendPasswordResetEmail };