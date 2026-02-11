const mongoose = require("mongoose");

const dbConfig = () =>
  mongoose
    .connect(process.env.DATABASE_STRING)
    .then(() => console.log("Database Connected..!"));

module.exports = dbConfig;
