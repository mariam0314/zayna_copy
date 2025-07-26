import express from "express";
import axios from "axios";
import { ChatMessage } from "../Models/Chatbot.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const userMsg = req.body.message;

  const userMessage = new ChatMessage({ role: "user", message: userMsg });
  await userMessage.save();

  // Debug log for OpenAI API key
  console.log("OpenAI API Key:", process.env.OPENAI_API_KEY ? "Loaded" : "NOT LOADED");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMsg }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    const botMessage = new ChatMessage({ role: "bot", message: botReply });
    await botMessage.save();

    res.json({ reply: botReply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Oops! Something went wrong." });
  }
});

export default router;
