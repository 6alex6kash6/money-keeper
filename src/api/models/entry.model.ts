import { Schema, model } from "mongoose";
//TODO: add ref field to budget
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
});

export const Entry = model("entries", entrySchema);
