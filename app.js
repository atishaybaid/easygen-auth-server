import express from "express";
import connectDB from "./db.js";
import authRoutes from "./authRoutes.js";
import cors from "cors";

import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

const { env } = process;
const { SERVER_PORT, MONGODB_URL } = env;

connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/auth", authRoutes);

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening on port ${SERVER_PORT}`);
});
