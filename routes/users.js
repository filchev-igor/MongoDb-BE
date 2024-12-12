var express = require("express");
var router = express.Router();
const User = require("../models/user");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  //res.send("respond with a resource");

  try {
    const users = await User.find(); // Fetch all users

    //const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  /*
  User.find()
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      res.json(err);
    });

     */
});

module.exports = router;
