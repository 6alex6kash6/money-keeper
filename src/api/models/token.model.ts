import { Schema, model } from "mongoose";

interface TokenDocument {
  userId: string;
  refreshTokens: Array<string>;
}

const tokenSchema = new Schema({
  userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  refreshTokens: {
    type: Array,
    maxlength: 5,
  },
});

const Token = model("Tokens", tokenSchema);

export { Token, TokenDocument };
