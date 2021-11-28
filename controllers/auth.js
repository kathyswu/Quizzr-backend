// Imports
const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const hashAndSaltPassword = require("../utils/hashAndSaltPassword");

// .env variables
require("dotenv").config();
const secret = process.env.SECRET;

const register = async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email });

    if (foundUser)
      return res.status(400).json({
        status: 400,
        message:
          "This email has already been registered. Please try another email address.",
      });

    const hash = hashAndSaltPassword(req.body.password);
    const createdUser = await db.User.create({ ...req.body, password: hash });

    return res
      .status(201)
      .json({ status: 201, message: "success", createdUser });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

const login = async (req, res) => {
  try {
    const foundUser = await db.User.findOne({ email: req.body.email }).select(
      "+password"
    );

    if (!foundUser) {
      return res.status(400).json({
        status: 400,
        message: "The username or password entered is incorrect",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (isMatch) {
      const signedJwt = await jwt.sign(
        {
          _id: foundUser._id,
        },
        secret,
        {
          expiresIn: "3h",
        }
      );

      return res.status(200).json({
        status: 200,
        message: "Successfully signed in",
        token: signedJwt,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "The username or password entered is incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Something went wrong. Please try again",
    });
  }
};

module.exports = {
  register,
  login,
};
