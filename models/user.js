//import mongoose from "mongoose";

const mongoose = require("mongoose");

// Define the schema for the 'users' collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true },
});

// Create and export the model
const User = mongoose.model("User", userSchema);
module.exports = User;
