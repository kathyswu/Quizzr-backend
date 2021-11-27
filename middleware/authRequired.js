// JSON web token
const jwt = require("jsonwebtoken");

require("dotenv").config();

const secret = process.env.SECRET;

module.exports = async (req, res, next) => {
  try {
    const bearer = req.headers.authorization;
    if (!bearer) {
      return res.sendStatus(403);
    }
    const token = bearer.split(" ")[1];

    // Verify token
    const payload = await jwt.verify(token, secret);
    console.log({ payload });
    req.userId = payload._id;

    next();

  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};
