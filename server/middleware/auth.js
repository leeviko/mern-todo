const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  // Check token
  if(!token) return res.status(401).json({ msg: "Unauthorized" });

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
    // Add user from payload
    req.user = decoded;
    
    next();
  } catch(e) {
    res.status(400).json({ msg: "Token is invalid" });
  }
} 

module.exports = auth;