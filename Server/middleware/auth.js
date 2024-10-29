const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    // Get token from header
    // console.log("req.headers.authorization", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    const user = jwt.verify(token, process.env.JWTSECRET);
    req.user = user;
    // console.log("req.user", req.user);
    next();
  } catch (err) {
    res.status(400).send("Invalid token.");
  }
};