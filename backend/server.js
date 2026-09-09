require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

const requiredEnvVariables = [
  "MONGO_URI",
  "JWT_SECRET",
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    console.error(`Missing required environment variable: ${variable}`);
  }
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json({ limit: "10kb" }));

app.use("/api/registrations", registrationRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("S2S Backend Server is running!");
});

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    throw error;
  }
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

module.exports = app;