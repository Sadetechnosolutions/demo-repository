const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const {
  generateToken,
  sendPasswordResetEmail,
} = require("../middleware/reset");

exports.createUser = async (req, res) => {
  const { username, email, phoneNumber, password, confirmPassword } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ message: "Email is missing or invalid" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await prisma.individual.findOne({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.individual.create({
      data: {
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.individual.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken();

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: resetToken },
    });

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error initiating password reset:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find the user by reset token
    const user = await prisma.individual.findFirst({
      where: { resetToken: token },
    });

    if (!user || !user.resetToken || user.resetToken !== token) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }


    await prisma.individual.update({
      where: { id: user.id },
      data: {
        password: newPassword,
        resetToken: null,
      },
    });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};