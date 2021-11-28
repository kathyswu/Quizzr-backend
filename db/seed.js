const db = require("../models");
const hashAndSaltPassword = require("../utils/hashAndSaltPassword");
const { kathy } = require("./userData.json");
const seedQuizzes = require("./quizData.json");

let userId = "";

const mongoose = require("mongoose");
require("dotenv").config();

const connectionString =
  process.env.MONGODB_URI || "mongodb://localhost:27017/quizzr";

const configOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connectionString, configOptions)
  .then(() => {
    console.log("MongoDB successfully connected~");
    // Delete existing users
    db.User.deleteMany({}, async (error, result) => {
      if (error) {
        console.log(error);
        process.exit();
      }

      console.log(result.deletedCount, " users deleted");

      const hash = await hashAndSaltPassword(kathy.password);

      db.User.create({ ...kathy, password: hash }, (error, seededUser) => {
        if (error) {
          console.log(error);
          process.exit();
        }

        userId = seededUser._id;

        console.log(seededUser, " user created successfully");

        // Delete existing quizzes
        db.Quiz.deleteMany({}, (error, result) => {
          if (error) {
            console.log(error);
            process.exit();
          }

          console.log(result.deletedCount, " quizzes deleted");

          const quizzes = seedQuizzes.quizzes.map((quiz) => ({
            ...quiz,
            user: userId,
          }));

          // Create quizzes
          db.Quiz.create(quizzes, (error, seededQuizzes) => {
            if (error) {
              console.log(error);
              process.exit();
            }
            console.log(seededQuizzes.length, " quizzes created successfully");
            console.log("Finished Seeding!");

            process.exit();
          });
        });
      });
    });
  })
  .catch((error) => console.log(`MongoDB connection error: ${error}`));
