import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";

export const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill up all the fields!",
      });
    }

    const user = await User.findOne(email);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exist!",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    newUser.save();
  } catch (error) {}
};

export const login = async (req, res) => {
  try {
  } catch (error) {
    
  }
};
