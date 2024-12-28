import express from "express";
import {
  receiveMessage,
  createConversation,
  getMessageByConversation,
} from "./chatController.js";

const router = express.Router();

// ReceiveChat message route
router.post("/send-message", receiveMessage);
router.post("/create-conversation-and-send-message", createConversation);
router.get("/get-conversation-by-id", getMessageByConversation);

export default router;
