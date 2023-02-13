
const mongoose = require("mongoose"),
  Gallery = require("./models/gallery");
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://IirisAdmin:artistportfolio@artistportfolio.dar6xev.mongodb.net/test",
  { useNewUrlParser: true/* , useFindAndModify: false */ }
);