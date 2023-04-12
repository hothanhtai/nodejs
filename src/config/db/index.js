const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/F8-Tutorial");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
