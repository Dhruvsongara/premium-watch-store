const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
async function main() {
  await mongoose.connect("mongodb://localhost:27017/premium-watch-store");
  console.log("MongoDB connected...");
}

// Call the MongoDB connection function
main();

// Simple Routes
app.get("/", (req, res) => {
  res.send("watch Delivery App Backend");
});

// Set up routes (you can uncomment these later if needed)
const authRoutes = require("./routes/authRoutes");
const watchRoutes = require("./routes/watchRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/watches", watchRoutes);
app.use("/api/cart", cartRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
