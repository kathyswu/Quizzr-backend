const mongoose = require("mongoose");

const connectionString = process.env.MONGODB_URI || "mongodb://localhost:27017/quizr";

const configOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindandModify: false,
};

mongoose.connect(connectionString, configOptions)
  .then(() => console.log("MongoDB successfully connected..."))
  .catch(error => console.log(`MongoDB connection error: ${error}`));

module.exports = {
  Quiz: require("./Quiz"),
  User: require("./User"),
};