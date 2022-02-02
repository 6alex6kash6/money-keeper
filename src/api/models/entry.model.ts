import { Schema, model } from "mongoose";

const entrySchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  entryType: {
    required: true,
    type: Number,
  },
  category: {
    required: true,
    type: Number,
  },
  value: {
    required: true,
    type: Number,
  },
  date: {
    required: true,
    type: Date,
  },
  budget: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Budgets",
  },
});

export const Entry = model("Entries", entrySchema);
