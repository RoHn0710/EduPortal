const express = require("express");
const router = express.Router();
const StudentProfile = require("../models/StudentProfile");

// ✅ GET: Fetch all student profiles (for dropdown list)
router.get("/all", async (req, res) => {
  try {
    const profiles = await StudentProfile.find({}, "userId fullName registrationNumber");
    res.status(200).json(profiles);
  } catch (err) {
    console.error("❌ Error fetching all profiles:", err.message);
    res.status(500).json({ error: "Failed to fetch student profiles" });
  }
});

// ✅ GET: Fetch profile summary for result page or dashboard
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const profile = await StudentProfile.findOne({ userId });

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // ✅ Return full profile data expected by the frontend
    res.status(200).json({
      fullName: profile.fullName || "N/A",
      registrationNumber: profile.registrationNumber || "N/A",
      parentsName: profile.parentsName || "",
      dob: profile.dob || "",
      yearOfJoining: profile.yearOfJoining || "",
      batch: profile.batch || "",
      degree: "", // reserved for future fields
      branch: ""
    });
  } catch (err) {
    console.error("❌ Error getting profile:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

// ✅ POST: Create or update a profile
router.post("/", async (req, res) => {
  const { userId, fullName, parentsName, dob, yearOfJoining, batch } = req.body;

  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }

  try {
    const updatedProfile = await StudentProfile.findOneAndUpdate(
      { userId },
      { userId, fullName, parentsName, dob, yearOfJoining, batch },
      { new: true, upsert: true }
    );
    res.status(200).json({ message: "✅ Profile updated", profile: updatedProfile });
  } catch (err) {
    console.error("❌ Error updating profile:", err.message);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

module.exports = router;
