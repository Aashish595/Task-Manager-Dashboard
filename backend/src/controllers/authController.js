import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";
import { validateEmail, validatePassword, validateRequired } from "../utils/validateInput.js";

// ------------------- REGISTER -------------------
export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Required fields check
    const validation = validateRequired({ email, password, fullName });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`
      });
    }

    // Validate email
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return res.status(400).json({
        success: false,
        message: passwordValidation.message
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName: fullName.trim()
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: newUser._id,
          email: newUser.email,
          fullName: newUser.fullName,
          avatarUrl: newUser.avatarUrl || "",
          createdAt: newUser.createdAt
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};

// ------------------- LOGIN -------------------
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validation = validateRequired({ email, password });
    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${validation.missing.join(", ")}`
      });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          email: user.email,
          fullName: user.fullName,
          avatarUrl: user.avatarUrl || "",
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

// ------------------- GET PROFILE -------------------
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

// ------------------- UPDATE PROFILE -------------------
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
