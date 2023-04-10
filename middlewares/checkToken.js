const jwt = require("jsonwebtoken");
function checkToken(req, res, next) {
  try {
    const token = req.get("x-auth-token");
    if (!token) {
        throw new Error("Ro'yhatdan otishingiz zarur");
    }
    const decoded = jwt.verify(token, process.env.ZOROBOT_KEY);
    if (!decoded) {
        throw new Error("Ro'yhatdan otishingiz zarur");
      }
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = checkToken;
