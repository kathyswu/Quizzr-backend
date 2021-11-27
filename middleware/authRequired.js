// JSON web token
const jwt = require("jsonwebtoken");

// .env variables
require("dotenv").config();
const secret = process.env.SECRET;

// JWT verification
module.exports = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      return res.sendStatus(403);
    }
    const token = bearer.split(" ")[1];

    // Verify token
    const payload = await jwt.verify(token, secret);

    req.userId = payload._id;

    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Error in JWT verification" });
  }
};
