const express = require("express");
const Conference = require("../models/conference"); // Import the Conference model
const { isValidObjectId } = require("mongoose");
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

// PATCH /conferences/:id/participants - Add or remove participants
router.patch("/:id/participants", async (req, res) => {
  try {
    const { id } = req.params; // Conference ID
    const { participantId } = req.body; // Participant ID from the body

    // Validate IDs
    if (!isValidObjectId(id) || !isValidObjectId(participantId)) {
      return res
        .status(400)
        .json({ error: "Invalid conference or participant ID" });
    }

    // Check if the participant exists in the User collection
    const participantExists = await User.findById(participantId);
    if (!participantExists) {
      return res
        .status(404)
        .json({ error: "Participant not found in the User collection" });
    }

    // Find the conference by ID
    const conference = await Conference.findById(id);
    if (!conference) {
      return res.status(404).json({ error: "Conference not found" });
    }

    // Check if the participant is already in the participants array
    if (conference.participants.includes(participantId)) {
      return res.status(400).json({ error: "Participant is already added" });
    }

    // Add the participant to the participants array
    conference.participants.push(participantId);

    // Save the updated conference
    await conference.save();

    res.json({
      message: "Participant added successfully.",
      participants: conference.participants,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
