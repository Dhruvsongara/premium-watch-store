const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const router = express.Router();

// Signup
router.post("/signin", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const check = await User.findOne({ email });
    if (check) {
      return res.json({ errors: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const data = {
      user: {
        id: user._id,
      },
    };

    const token = jwt.sign(data, "user");
    res.json({
      success: true,
      message: "User registered successfully !",
      token,
    });
  } catch (error) {
    console.error(error);
    res.json({ error: "Internal Server Error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, "user");
    res.json({
      success: true,
      message: " User logged in successfully !",
      id: user._id,
      token,
    });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});
module.exports = router;
