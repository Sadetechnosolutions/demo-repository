// src/routes/auth.js

const express = require("express");
const router = express.Router();
const authController = require("../controller/auth");

router.post("/register", authController.createUser);

router.post("/login", authController.loginUser);
router.post('/reset-password', authController.resetPassword);

module.exports = router;