const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.json({ message: "Unauthorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, "user");
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.json({ message: "Invalid token" });
  }
};

module.exports = protect;
