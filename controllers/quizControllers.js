const { Quiz } = require("../models");

const index = (req, res) => {
  Quiz.find({}, (error, foundQuizzes) => {
    if (error) {
      console.log("Error in quiz index: ", error);
      return res.send("Error in quiz index controller function");
    }

    res.json({
      status: 200,
      message: "All Quizzes Sent Back as Response",
      quizzes: foundQuizzes,
      total: foundQuizzes.length,
      requestedAt: new Date(),
    });
  });
};

//FIXME: backend server function to find all quizzes by user id
const userQuizzes = (req, res) => {
  Quiz.find({ user: req.query.id }, (error, foundQuizzes) => {
    if (error) {
      console.log("Error in userQuizzes: ", error);
      return res.send("Error in userQuizzes controller function");
    }
    res.json({
      status: 200,
      message: "All user quizzes found and sent back",
      quizzes: foundQuizzes,
      total: foundQuizzes.length,
      requestedAt: new Date(),
    });
  });
};

const create = (req, res) => {
  if (req.body.thumbnail === "") {
    delete req.body.thumbnail;
  }
  Quiz.create(req.body, (error, savedQuiz) => {
    if (error) {
      console.log("Error in Quiz creation: ", error);

      return res.send("Error in quiz create controller function");
    }

    res.json({
      status: 201,
      message: "Quiz Successfully Created",
      quiz: savedQuiz,
      requestedAt: new Date(),
    });
  });
};

const update = (req, res) => {
  Quiz.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedQuiz) => {
      if (error) {
        console.log("Error in quiz update: ", error);

        return res.send("Error in quiz update controller function");
      }

      res.json({
        status: 200,
        message: `Sucessfully Updated Quiz with id ${updatedQuiz._id}`,
        quiz: updatedQuiz,
        requestedAt: new Date(),
      });
    }
  );
};

const destroy = (req, res) => {
  Quiz.findByIdAndDelete(req.params.id, (error, deletedQuiz) => {
    if (error) {
      console.log("Error in quiz destroy: ", error);

      return res.send("Error in quiz destroy controller function");
    }

    res.json({
      status: 200,
      message: `Sucessfully deleted Quiz with id ${deletedQuiz._id}`,
      quiz: deletedQuiz,
      requestedAt: new Date(),
    });
  });
};

module.exports = {
  index,
  userQuizzes,
  create,
  update,
  destroy,
};
