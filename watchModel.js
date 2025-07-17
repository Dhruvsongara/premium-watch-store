const mongoose = require("mongoose");

const watchSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
});

module.exports = mongoose.model("watch", watchSchema);
