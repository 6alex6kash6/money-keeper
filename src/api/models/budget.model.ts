import { Schema, model } from "mongoose";

interface BudgetDocument {
  name: string;
  wallet: string;
  value: number;
}

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
    // required: true,
    ref: "Users",
  },
});

const Budget = model("Budgets", budgetSchema);

export { Budget, BudgetDocument };
