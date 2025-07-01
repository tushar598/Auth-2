import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

// create user logic :-

export const createUser = async (req, res) => {
  const { name, email, password, age } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { name }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email or name already in use",
        field: existingUser.email === email ? "email" : "name",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name: name,
      email,
      password: hashedPassword,
      age,
    });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Register Error:", error.stack || error.message || error);
    return res.status(500).json({ message: "Server error" });
  }
};

//  Login user logic :-

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: userData._id }, process.env.JWT_SECRET);
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({ message: "Login successful" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};



//  Logout logic :

export const logoutUser = async (req, res) => {
  req.cookie("token", "");
  res.status(200).json({ message: "Logout successful" });
};




// deleteUser logic :

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove();
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};


