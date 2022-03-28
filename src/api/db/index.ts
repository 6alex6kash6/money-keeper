import mongoose from "mongoose";

const DB_STRING = "mongodb://127.0.0.1:27017/money-keeper";
// const options: mongoose.ConnectOptions = {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useFindAndModify: false,
// };
try {
  mongoose.connect(process.env.DB_STRING);
  console.log("Connected succesfully");
} catch (e) {
  console.error(`Error: ${e}`);
}
