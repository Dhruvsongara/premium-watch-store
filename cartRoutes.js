const express = require("express");
const Cart = require("../models/cartModel");
const Watch = require("../models/watchModel");
const protect = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Get cart items for a user
router.get("/", protect, async (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  const user = jwt.verify(token, "user");

  try {
    const cart = await Cart.find({ user: user.id }).populate("watch");
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Add item to cart
router.post("/add", protect, async (req, res) => {
  const { watch, quantity } = req.body;
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  const user = jwt.verify(token, "user");

  console.log("User:", user);

  try {
    const watchItem = await Watch.findById(watch);
    if (!watchItem) {
      return res.status(404).json({ message: "watch item not found" });
    }

    let cartItem = await Cart.findOne({ user: user.id, watch });

    console.log(cartItem);

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ user: user.id, watch, quantity });
      await cartItem.save();
    }

    res.json({ success: true, message: "Item added to cart", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error in add to cart" });
  }
});

// Remove from cart
router.post("/remove", protect, async (req, res) => {
  try {
    const { id } = req.body;
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    console.log("Token:", token);

    const user = jwt.verify(token, "user");

    await Cart.findOneAndDelete({ _id: id, user: user.id });
    res.json({ success: true, message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item" });
  }
});

module.exports = router;
