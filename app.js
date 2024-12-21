import express from "express";
import OpenAI from "openai";
import connectDB from "./db.js";
import authRoutes from "./authRoutes.js";
import chatRoutes from "./chatRoutes.js";

import cors from "cors";

import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

const { env } = process;
const { SERVER_PORT, MONGODB_URL, OPENAI_API_KEY } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/testOpenAI", async (req, res) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "What is Bikaner Famous For?" }],
    model: "gpt-4o-mini",
  });

  res.send({ openaiData: chatCompletion });
});

app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
