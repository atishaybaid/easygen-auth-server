import dotenv from "dotenv";
import OpenAI from "openai";

import Conversation from "./messagesModel.js";

dotenv.config();
const { env } = process;
const { SERVER_PORT, MONGODB_URL, OPENAI_API_KEY } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// receiveChatMessage
export const receiveMessage = async (req, res) => {
  const { message, author } = req.body;

  /*userInfo: { type: SchemaTypes.ObjectId, ref: "User", required: true }*/

  const chatData = await Conversation.create({
    text: message,
    author: author,
  });
  const createdConversation = await Conversation.findOne({
    text: message,
  }).populate("author");
  //   const chatCompletion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: message }],
  //     max_completion_tokens: 200,
  //     model: "gpt-4o-mini",
  //   });

  //res.send({ openaiData: chatCompletion });

  console.log("createdAuthor");
  console.log(createdConversation);
  res.send({ chatData: createdConversation });

  res.end();
};
