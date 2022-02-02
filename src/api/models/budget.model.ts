import { Schema, model } from "mongoose";

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
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
});

export const Budget = model("Budgets", budgetSchema);
