import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    console.log("Update request body:", req.body); // Debug log

    const { name, email, age } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found for ID:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    // name uniqueness check
    if (name && name !== user.name) {
      const existingUser = await User.findOne({ name });
      if (existingUser) {
        console.log("name already taken:", name);
        return res.status(400).json({ message: "name already taken" });
      }
      user.name = name;
      console.log("name updated to:", name);
    }

    if (age) {
      user.age = age;
      console.log("age updated to:", age);
    }
    if (email) {
      user.email = email;
      console.log("Email updated to:", email);
    }

    const updatedUser = await user.save();

    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      age: updatedUser.age,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating user profile:", error); // Debug log
    // Handle MongoDB duplicate key error specifically
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return res.status(400).json({ message: "name already taken" });
    }
    res.status(500).json({ message: "Server error", error });
  }
};

// Change user password
export const changeUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

