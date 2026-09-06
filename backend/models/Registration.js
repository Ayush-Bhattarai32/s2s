const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

  email: {
  type: String,
  required: true,
  trim: true,
  lowercase: true,
  match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
},

  phone: {
  type: String,
  required: true,
  trim: true,
  match: /^(97|98)\d{8}$/,
},

  dob: {
  type: String,
  required: true,
  match: /^\d{4}-\d{2}-\d{2}$/,
},

   gender: {
  type: String,
  required: true,
  enum: ["Male", "Female", "Other"],
},
   education: {
  type: String,
  required: true,
  enum: ["SEE", "SLC/+2", "Bachelors"],
},

    address: {
      type: String,
      required: true,
      trim: true,
    },

    guardian: {
      type: String,
      required: true,
      trim: true,
    },

   guardianPhone: {
  type: String,
  required: true,
  trim: true,
  match: /^(97|98)\d{8}$/,
},

    school: {
      type: String,
      trim: true,
    },

   course: {
  type: String,
  required: true,
  enum: [
    "Basic Computer",
    "Korean Language",
    "Japanese Language",
    "Accounting",
    "Career",
    "Business",
    "Maintenance",
    "HVAC",
    "AC Repair",
    "Home Appliance",
    "Montessori",
    "Industrial Electrician",
    "Building Electrician",
    "Automation",
  ],
},
    joinDate: {
  type: String,
  required: true,
  match: /^\d{4}-\d{2}-\d{2}$/,
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Registration", registrationSchema);