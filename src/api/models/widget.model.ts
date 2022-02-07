import { Schema, model } from "mongoose";

interface WidgetDocument {
  name: string;
  widgetType: number;
  widgetWidth: number;
  dateRange: { from: string; to: string };
}

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

const Widget = model("Widgets", widgetSchema);

export { Widget, WidgetDocument };
