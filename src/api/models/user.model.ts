import { Schema, model } from "mongoose";
const bcrypt = require("bcrypt");

interface UserDocument {
  email: string;
  password: string;
  refreshTokens: Array<string>;
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    default: "",
    type: String,
    required: true,
    minLength: 8,
    trim: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = model("Users", userSchema);
export { User, UserDocument };
