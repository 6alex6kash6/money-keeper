import { Schema, model } from "mongoose";
//TODO: add ref field to user

const budgetSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  wallet: {
    required: true,
    type: String,
    uppercase: true,
  },
  value: {
    required: true,
    type: Number,
  },
});

export const Budget = model("budgets", budgetSchema);
