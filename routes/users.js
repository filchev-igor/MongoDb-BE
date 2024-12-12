var express = require("express");
var router = express.Router();
const { User } = require("../models/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  //res.send("respond with a resource");

  User.find()
    .then(function (response) {
      res.json(response);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
