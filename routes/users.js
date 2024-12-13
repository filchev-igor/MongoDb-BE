var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { isValidObjectId } = require("mongoose");

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find();
    res.json(users); // `_id` is automatically replaced by `id`
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name, age, username, email, birthDate } = req.body;
    const newUser = new User({ name, age, username, email, birthDate });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // `_id` is replaced by `id`
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate the provided ID
    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Extract the updated user data from the request body
    const { name, age, username, email, birthDate } = req.body;

    // Find and update the user by ID
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, age, username, email, birthDate },
      { new: true, runValidators: true }, // Return the updated user and validate
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser); // Respond with the updated user data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
