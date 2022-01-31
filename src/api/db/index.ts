import mongoose from "mongoose";

const DB_STRING = "mongodb://localhost:27017/money-keeper";

try {
  mongoose.connect(DB_STRING);
  console.log("Connected succesfully");
} catch (e) {
  console.error(`Error: ${e}`);
}
