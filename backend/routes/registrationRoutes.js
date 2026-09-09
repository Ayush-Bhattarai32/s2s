
const express = require("express");
const rateLimit = require("express-rate-limit");
const Registration = require("../models/Registration");
const adminAuth = require("../middleware/adminAuth");

const router = express.Router();
const registrationLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 20,
  message: {
    message: "Too many registration attempts. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Submit a new registration
// PUBLIC ROUTE
router.post("/", registrationLimiter, async (req, res) => {
  try {
   const { email, course } = req.body;

const existingRegistration = await Registration.findOne({
  email,
  course,
});

if (existingRegistration) {
  return res.status(409).json({
    message: "You have already registered for this course.",
  });
}

const registration = new Registration(req.body);

const savedRegistration = await registration.save();

    res.status(201).json({
      message: "Registration successful",
      registration: savedRegistration,
    });
 } catch (error) {
  console.error("Registration error:", error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Please provide valid registration details.",
    });
  }

  res.status(500).json({
    message: "Registration failed. Please try again later.",
  });
}
});

// Get all registrations
// ADMIN ONLY
router.get("/", adminAuth, async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });

    res.status(200).json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);

   res.status(500).json({
  message: "Failed to fetch registrations.",
});
  }
});

// Delete a registration
// ADMIN ONLY
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const deletedRegistration = await Registration.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRegistration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      message: "Registration deleted successfully",
      registration: deletedRegistration,
    });
  } catch (error) {
    console.error("Error deleting registration:", error);

   res.status(500).json({
  message: "Failed to delete registration.",
});
  }
});

// Update a registration
// ADMIN ONLY
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const updatedRegistration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedRegistration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    res.status(200).json({
      message: "Registration updated successfully",
      registration: updatedRegistration,
    });
 } catch (error) {
  console.error("Error updating registration:", error);

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Please provide valid registration details.",
    });
  }

  res.status(500).json({
    message: "Failed to update registration. Please try again later.",
  });
}
});

module.exports = router;
