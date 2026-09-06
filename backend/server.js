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
    process.exit(1);
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

const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });