const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  birthDate: { type: Date, required: true },
});

// Transform `_id` to `id` and remove `__v`
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id; // Add `id` field
    delete ret._id; // Remove `_id`
    delete ret.__v; // Remove `__v`
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
