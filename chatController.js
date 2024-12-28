import dotenv from "dotenv";
import OpenAI from "openai";

import Conversation from "./conversationsModel.js";
import Message from "./messageModel.js";

dotenv.config();
const { env } = process;
const { SERVER_PORT, MONGODB_URL, OPENAI_API_KEY } = env;

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// receiveChatMessage
export const receiveMessage = async (req, res) => {
  const { message, initaitor, conversationID } = req.body;

  const messageData = await storeMessage(message, initaitor, conversationID);

  //   const chatData = await Conversation.create({
  //     text: message,
  //     initaitor: initaitor,
  //   });
  //   const createdConversation = await Conversation.findOne({
  //     text: message,
  //   }).populate("initaitor");
  //   const chatCompletion = await openai.chat.completions.create({
  //     messages: [{ role: "user", content: message }],
  //     max_completion_tokens: 200,
  //     model: "gpt-4o-mini",
  //   });

  //res.send({ openaiData: chatCompletion });

  console.log("createdAuthor");
  res.send({ chatData: messageData });
  res.end();
};

export const getMessageByConversation = async (req, res) => {
  const { conversationID } = req.body;
  console.log("received conversation");
  console.log(conversationID);
  const messages = await Message.find({
    conversation: conversationID,
  });

  res.send({ messages: messages });
};

const storeMessage = async (message, author, conversation) => {
  const messageData = await Message.create({
    text: message,
    author: author,
    conversation: conversation,
  });
  return messageData;
};

export const createConversation = async (req, res) => {
  const { message, initaitor } = req.body;

  const converesation = await Conversation.create({
    initaitor: initaitor,
    members: [initaitor],
    text: message,
  });

  const conversationID = converesation["_id"];
  const messageData = await storeMessage(message, initaitor, conversationID);

  console.log("createdCOnversation");
  console.log(converesation);
  res.send({ conversation: converesation, messageData: messageData });

  res.end();
};
