// routes/contact.js
const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {
  try {
    const { name, email, reason, message } = req.body;

    if (!name || !email || !reason || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newMessage = new Contact({ name, email, reason, message });
    await newMessage.save();

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (err) {
    console.error("❌ Error saving contact message:", err);
    res.status(500).json({ error: "Failed to submit feedback." });
  }
});

module.exports = router;
