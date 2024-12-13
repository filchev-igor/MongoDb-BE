const express = require("express");
const Conference = require("../models/Conference"); // Import the Conference model
const router = express.Router();

// GET all conferences
router.get("/", async (req, res) => {
  try {
    const conferences = await Conference.find();
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST a new conference
router.post("/", async (req, res) => {
  try {
    const newConference = new Conference(req.body);
    const savedConference = await newConference.save();
    res.status(201).json(savedConference);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a conference by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedConference = await Conference.findByIdAndDelete(req.params.id);
    if (!deletedConference) {
      return res.status(404).json({ error: "Conference not found" });
    }
    res.status(204).send(); // No content on success
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
