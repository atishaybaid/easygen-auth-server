import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const { env } = process;
const { SERVER_PORT, MONGODB_URL, OPENAI_API_KEY } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// receiveChatMessage
export const receiveMessage = async (req, res) => {
  const { message } = req.body;

  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: message }],
    model: "gpt-4o-mini",
  });

  res.send({ openaiData: chatCompletion });
  res.end();
};
