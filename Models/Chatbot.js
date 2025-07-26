import mongoose from "mongoose";

const ChatMessageSchema = new mongoose.Schema({
  role: String, // user or bot
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
