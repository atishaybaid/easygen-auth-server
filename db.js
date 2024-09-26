import mongoose from "mongoose";
import "dotenv/config";

const { env } = process;
const { MONGODB_URL } = env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
