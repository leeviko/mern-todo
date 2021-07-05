const mongoose = require("mongoose");

const db = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(
      db,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      }
    )
    console.log("MongoDB is connected");
  } catch(err) {
    console.log(err);
  }
}

module.exports = connectDB;