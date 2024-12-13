var express = require("express");
var router = express.Router();
const User = require("../models/user");

router.get("/", async function (req, res, next) {
  try {
    const users = await User.find();

    const normalizedUsers = users.map((user) => {
      const { _id, ...rest } = user.toObject();

      return { id: _id, ...rest };
    });
    res.json(normalizedUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { name, age, username } = req.body;

    const newUser = new User({ name, age, username });

    const savedUser = await newUser.save();

    const { _id, ...rest } = savedUser.toObject();

    res.status(201).json({ id: _id, ...rest });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
