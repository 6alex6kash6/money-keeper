import { Schema, model } from "mongoose";

interface UserDocument {
  email: string;
  password: string;
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

const User = model("Users", userSchema);
export { User, UserDocument };
