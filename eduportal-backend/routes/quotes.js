const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /api/quotes/motivational
router.get("/motivational", async (req, res) => {
  try {
    const response = await axios.get("https://zenquotes.io/api/random");
    res.json(response.data); // returns an array with a quote object
  } catch (error) {
    console.error("Error fetching motivational quote:", error.message);
    res.status(500).json({ error: "Failed to fetch motivational quote" });
  }
});

module.exports = router;
