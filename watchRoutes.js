const express = require("express");
const watch = require("../models/watchModel");
const router = express.Router();

// Get all watches
router.get("/", async (req, res) => {
  const watches = await watch.find();
  if (watches) {
    res.json(watches);
  } else {
    res.json({ message: "watch not found" });
  }
});

// Add new watch
router.post("/add", async (req, res) => {
  const { name, description, price, image, category } = req.body;
  const newwatch = new watch({ name, description, price, image, category });
  await newwatch.save();
  res.json({ message: "watch added successfully", newwatch });
});

// Get watch details by ID
router.get("/:id", async (req, res) => {
  const foundWatch = await watch.findById(req.params.id);

  if (foundWatch) {
    res.json(foundWatch);
  } else {
    res.json({ message: "watch not found" });
  }

});

module.exports = router;
