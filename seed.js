
const mongoose = require("mongoose"),
  Course = require("./models/course");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/confetti_cuisine",
  { useNewUrlParser: true, useFindAndModify: false }
);