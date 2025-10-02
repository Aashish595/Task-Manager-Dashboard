import User from "../models/User.js";
import { validateEmail } from "../utils/validateInput.js";


export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "id email fullName avatarUrl createdAt updatedAt"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch profile"
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { email, fullName, avatarUrl } = req.body;
    const updates = {};

   
    if (email) {
      if (!validateEmail(email)) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format"
        });
      }

      const existingUser = await User.findOne({
        email: email.toLowerCase(),
        _id: { $ne: req.userId } 
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already in use"
        });
      }

      updates.email = email.toLowerCase();
    }

    if (fullName !== undefined) updates.fullName = fullName.trim();
    if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No fields to update"
      });
    }

    updates.updatedAt = new Date();

    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
      runValidators: true,
      select: "id email fullName avatarUrl createdAt updatedAt"
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update profile"
    });
  }
};
