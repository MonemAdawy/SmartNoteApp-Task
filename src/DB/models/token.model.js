import { Schema, model } from "mongoose";

const tokenSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Token = model("Token", tokenSchema);
export default Token;