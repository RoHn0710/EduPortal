const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Marks = require("../models/Marks");
const StudentProfile = require("../models/StudentProfile");

// GET student result by userId (all semesters)
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Validate and convert to ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId format" });
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    // 1. Fetch student profile using ObjectId
    const profile = await StudentProfile.findOne({ userId: objectId });

    if (!profile) {
      return res.status(404).json({ error: "Student profile not found" });
    }

    // 2. Fetch all marks for the student
    const marksDoc = await Marks.findOne({ userId: objectId });

    res.status(200).json({
      fullName: profile.fullName || "",
      registrationNumber: profile.registrationNumber || "",
      degree: profile.degree || "",
      branch: profile.branch || "",
      results: marksDoc?.marks || [],
    });
  } catch (err) {
    console.error("❌ Error fetching marks:", err.message);
    res.status(500).json({ error: "Failed to fetch result" });
  }
});
// POST route to upload or update marks for a student
router.post("/upload", async (req, res) => {
  try {
    const { userId, marks } = req.body;

    if (!userId || !Array.isArray(marks)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    // Check if a marks document exists for this user
    let marksDoc = await Marks.findOne({ userId });

    if (marksDoc) {
      // Update existing marks
      marksDoc.marks = marks;
      await marksDoc.save();
    } else {
      // Create new marks document
      marksDoc = new Marks({ userId, marks });
      await marksDoc.save();
    }

    res.status(200).json({ message: "✅ Marks uploaded successfully" });
  } catch (err) {
    console.error("❌ Upload error:", err.message);
    res.status(500).json({ error: "❌ Failed to upload marks" });
  }
});
// ✅ NEW: Get chart summary of uploaded vs pending marks
router.get("/chart/summary", async (req, res) => {
  try {
    const totalProfiles = await StudentProfile.countDocuments();
    const uploadedMarks = await Marks.countDocuments();

    const pending = totalProfiles - uploadedMarks;

    res.status(200).json({
      totalStudents: totalProfiles,
      uploaded: uploadedMarks,
      pending: pending < 0 ? 0 : pending,
    });
  } catch (err) {
    console.error("❌ Error fetching chart summary:", err.message);
    res.status(500).json({ error: "Failed to get chart data" });
  }
});



module.exports = router;
