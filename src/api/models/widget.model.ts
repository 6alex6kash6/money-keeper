import { Schema, model } from "mongoose";
//TODO: add ref field to budget

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
  //   budget: {
  //     required: true,
  //     type: Number,
  //   },
  dateRange: {
    from: Date,
    to: Date,
  },
});

export const Widget = model("widgets", widgetSchema);
