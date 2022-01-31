import { Schema, model } from "mongoose";

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

export const User = model("users", userSchema);
