
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const adminAuth = require("../middleware/adminAuth");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: {
    message: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const passwordChangeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    message: "Too many password change attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
const JWT_SECRET = process.env.JWT_SECRET;

// Admin login
router.post("/login", adminLoginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

        if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }

// Find admin in MongoDB
const admin = await Admin.findOne({ username });

if (!admin) {
  return res.status(401).json({
    message: "Invalid username or password.",
  });
}

// Check password
const passwordMatches = await bcrypt.compare(
  password,
  admin.passwordHash
);

if (!passwordMatches) {
  return res.status(401).json({
    message: "Invalid username or password.",
  });
}

    // Create JWT token
    const token = jwt.sign(
      {
        username: admin.username,
        role: admin.role,
      },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Admin login error:", error);

    res.status(500).json({
      message: "Login failed",
    });
  }
});
// Verify admin token
router.get("/verify", adminAuth, (req, res) => {
  res.status(200).json({
    message: "Token is valid",
    admin: {
      username: req.admin.username,
      role: req.admin.role,
    },
  });
});

// Change admin password
router.put(
  "/change-password",
  adminAuth,
  passwordChangeLimiter,
  async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message: "New password must be at least 8 characters long.",
      });
    }

    const admin = await Admin.findOne({
      username: req.admin.username,
    });

    if (!admin) {
      return res.status(404).json({
        message: "Admin account not found.",
      });
    }

    const currentPasswordMatches = await bcrypt.compare(
      currentPassword,
      admin.passwordHash
    );

    if (!currentPasswordMatches) {
      return res.status(401).json({
        message: "Current password is incorrect.",
      });
    }

    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    admin.passwordHash = newPasswordHash;

    await admin.save();

    res.status(200).json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error("Change password error:", error);

    res.status(500).json({
      message: "Failed to change password.",
    });
  }
});

module.exports = router;