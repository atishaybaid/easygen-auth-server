import User from "./userMode.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup
export const signup = async (req, res) => {
  const { user_name, user_email, user_pass } = req.body;

  try {
    const userExists = await User.findOne({ email: user_email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name: user_name,
      email: user_email,
      password: user_pass,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        success: true,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  const { user_email, user_pass } = req.body;
  try {
    const user = await User.findOne({ email: user_email });

    if (user && (await user.matchPassword(user_pass))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
        success: true,
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const testController = async (req, res) => {
  const { user_name, email, password } = req.body;

  res.status(200).json({ message: "test sucessful" });
};
