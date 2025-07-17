const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  watch: { type: mongoose.Schema.Types.ObjectId, ref: "watch" },
  quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model("Cart", cartSchema);
