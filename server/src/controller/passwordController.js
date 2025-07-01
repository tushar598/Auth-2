import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// @desc    Simulate sending password reset email
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found with this email." });
    }

    // In a real app, you'd send a verification email here
    return res.status(200).json({ message: "Verification email sent." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

// @desc    Reset the user password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};
