var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const { MONGODB_URL } = require("../constants/constants");

mongoose.connect(MONGODB_URL);

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
