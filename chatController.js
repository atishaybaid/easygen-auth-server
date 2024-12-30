import dotenv from "dotenv";

import Conversation from "./conversationsModel.js";
import Message from "./messageModel.js";
import { generateAIReplies } from "./aiReplies.js";

dotenv.config();

// receiveChatMessage

const getReplyFromAI = async (conversationID) => {
  const messagesForAperticularConversation = await getMessagesByConversationID(
    conversationID
  );
  const assistantReplyObject = await generateAIReplies(
    messagesForAperticularConversation
  );
  const assistantReply = assistantReplyObject["text"];
  const assistantAuthor = assistantReplyObject["author"];

  const storredAIReply = await storeMessage(
    assistantReply,
    assistantAuthor,
    conversationID
  );

  return storredAIReply;
};

export const receiveMessage = async (req, res) => {
  const { message, initaitor, conversationID } = req.body;

  // store the received messageInDB
  const messageData = await storeMessage(message, initaitor, conversationID);

  // get the reply from the ai ,for the current conversation
  await getReplyFromAI(conversationID);
  const conversationsWithAIReply = await getMessagesByConversationID(
    conversationID
  );
  res.send({ chatData: messageData, conversation: conversationsWithAIReply });
  res.end();
};

export const createConversation = async (req, res) => {
  const { message, initaitor } = req.body;

  //create the conversation
  const converesation = await Conversation.create({
    initaitor: initaitor,
    members: [initaitor],
    text: message,
  });
  const conversationID = converesation["_id"];

  //store the first message
  await storeMessage(message, initaitor, conversationID);

  //Get the reply from AI
  await getReplyFromAI(conversationID);

  // get all the conversatoins again with replies from ai as well
  const conversationsWithAIReply = await getMessagesByConversationID(
    conversationID
  );

  res.send({
    conversation: conversationsWithAIReply,
  });

  res.end();
};

const getMessagesByConversationID = async (conversationID) => {
  const messages = await Message.find({
    conversation: conversationID,
  });

  return messages;
};

//get conversation
export const getMessageByConversation = async (req, res) => {
  const { conversationID } = req.body;
  console.log("received conversation");
  console.log(conversationID);
  const messages = await getMessagesByConversationID(conversationID);

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
