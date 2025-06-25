const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const Admin = require("./models/Admin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);         // All /api/auth/* routes go to auth.js
app.use("/api/profile", profileRoutes);   // For profile-related APIs

const marksRoutes = require("./routes/marks");
app.use("/api/marks", marksRoutes);

const contactRoutes = require("./routes/contact");
app.use("/api/contact", contactRoutes);

// MongoDB connection and default admin seeding
mongoose
  .connect("mongodb+srv://Rohn:m123123@eduportal.a3kfpxq.mongodb.net/eduportal?retryWrites=true&w=majority&appName=EduPortal")
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // 👇 Seed default admin if it doesn't exist
    const existingAdmin = await Admin.findOne({ username: "admin" });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // Default password
      await Admin.create({ username: "admin", password: hashedPassword });
      console.log("✅ Default admin created: admin / admin123");
    }
  })
  .catch((err) => console.error("❌ DB error:", err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
