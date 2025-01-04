import express from "express";
import {
  receiveMessage,
  createConversation,
  getMessageByConversation,
} from "./chatController.js";

import { findSimilar, storeBulk } from "./embeddingController.js";

const router = express.Router();

// ReceiveChat message route
router.post("/send-message", receiveMessage);
router.post("/create-conversation-and-send-message", createConversation);
//get
router.get("/get-conversation-by-id", getMessageByConversation);

//embeddings
router.post("/find-similar", findSimilar);
router.post("/store-bulk-movies", storeBulk);
export default router;
