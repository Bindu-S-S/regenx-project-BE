const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Add validation for token format
  const tokenParts = token.split(" ");
  if (tokenParts.length < 2) {
    return res.status(401).json({ message: "Invalid token format" });
  }
  
  const tok = tokenParts[1];
  
  try {
    const user = await User.find({ token: tok });
    if (!user || user.length === 0) {  // Fixed: check array length
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user[0];
    next();  // Move next() inside try block
  } catch (error) {
    console.error("Auth error:", error);  // Add logging
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { auth };