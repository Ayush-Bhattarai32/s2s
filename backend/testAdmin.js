require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

async function test() {
  await mongoose.connect(process.env.MONGO_URI);

  const admin = await Admin.findOne({ username: "admin" });

  if (!admin) {
    console.log("❌ Admin not found");
  } else {
    console.log("✅ Admin found");
    console.log("Username:", admin.username);
    console.log("Role:", admin.role);
    const password = process.env.ADMIN_TEST_PASSWORD;

    if (!password) {
      console.log("Set ADMIN_TEST_PASSWORD to test the stored password.");
    } else {
      const matches = await bcrypt.compare(password, admin.passwordHash);
      console.log("Password matches:", matches);
    }
  }

  await mongoose.disconnect();
}

test().catch(console.error);