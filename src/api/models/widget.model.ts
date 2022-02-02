import { Schema, model } from "mongoose";

const widgetSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  widgetType: {
    required: true,
    type: Number,
  },
  widgetWidth: {
    type: Number,
  },
  budget: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Budgets",
  },
  dateRange: {
    from: Date,
    to: Date,
  },
});

export const Widget = model("Widgets", widgetSchema);
