import express from "express";
import { receiveMessage } from "./chatController.js";

const router = express.Router();

// ReceiveChat message route
router.post("/send-message", receiveMessage);

export default router;
