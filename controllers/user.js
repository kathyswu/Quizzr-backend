const { User } = require("../models");

const show = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.userId);

    return res.status(200).json({
      status: 200,
      message: "Successfully found user",
      user: foundUser,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: 500, message: "Error in User show function" });
  }
};

const update = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedUser) => {
      if (error) {
        console.log("Error in user update function: ", error);
        return res.send("Error in user update controller function");
      }

      res.json({
        status: 200,
        message: `Sucessfully updated user with id ${updatedUser._id}`,
        user: updatedUser,
        requestedAt: new Date(),
      });
    }
  );
};

const destroy = (req, res) => {
  User.findByIdAndDelete(req.params.id, (error, deletedUser) => {
    if (error) {
      console.log("Error in user destroy function:", error);

      return res.send("Error in user destroy controller function");
    }

    res.json({
      status: 200,
      message: `Sucessfully deleted user with id ${deletedUser._id}`,
      game: deletedUser,
      requestedAt: new Date(),
    });
  });
};

module.exports = {
  show,
  update,
  destroy,
};
