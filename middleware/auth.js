const User = require("../models/User");

const auth = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const tok = token.split(" ")[1];
  try {
    const user = await User.find({ token: tok });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user[0];
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
  // req.user = {
  //   _id: "1234567890",
  // };
  // Verify the token here (e.g., using JWT)
  // If valid, call next()
  // If invalid, return an error response
  next();
};

module.exports = { auth };
