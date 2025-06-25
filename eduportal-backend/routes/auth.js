const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const StudentProfile = require("../models/StudentProfile");
const Admin = require("../models/Admin"); // Ensure this model exists

// Register Route
router.post("/register", async (req, res) => {
  try {
    console.log("📥 Register request body:", req.body);
    const {
      name,
      email,
      password,
      registrationNumber,
      department,
      dob,
      yearOfJoining,
    } = req.body;

    if (!name || !email || !password || !registrationNumber || !department || !dob || !yearOfJoining) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const parsedDob = new Date(dob);
    if (isNaN(parsedDob)) {
      return res.status(400).json({ error: "Invalid date format for DOB" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const existingProfile = await StudentProfile.findOne({ registrationNumber });
    if (existingProfile) {
      return res.status(400).json({ error: "Profile already exists for this registration number" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      registrationNumber,
      department,
      dob: parsedDob,
      yearOfJoining: Number(yearOfJoining),
    });

    const savedUser = await user.save();
    console.log("✅ User saved with ID:", savedUser._id);

    // Create and save profile
    const profile = new StudentProfile({
      userId: savedUser._id,
      fullName: name,
      registrationNumber,
      dob: parsedDob,
      yearOfJoining: Number(yearOfJoining),
    });

    await profile.save();
    console.log("✅ Student profile created for userId:", savedUser._id, (savedUser.fullName));

    res.status(201).json({ message: "✅ User and Profile registered successfully" });
  } catch (err) {
    console.error("❌ Registration Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({
      message: "✅ Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
        registrationNumber: user.registrationNumber,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// Admin Login Route
router.post("/admin-login", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("🔐 Admin login attempt:", username);

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    res.status(200).json({
      message: "✅ Admin login successful",
      admin: {
        _id: admin._id,
        username: admin.username,
      },
    });
  } catch (err) {
    console.error("❌ Admin Login Error:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }

});
// Admin route to get list of students (name, reg no, marks only)
router.get("/admin/students", async (req, res) => {
  try {
    const students = await User.find({}, "name registrationNumber marks");
    res.status(200).json(students);
  } catch (err) {
    console.error("❌ Failed to fetch students:", err);
    res.status(500).json({ error: "Unable to fetch student list" });
  }
});

module.exports = router;
