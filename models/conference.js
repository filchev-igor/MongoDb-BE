const mongoose = require("mongoose");

const SpeakerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
});

const AgendaSchema = new mongoose.Schema({
  time: { type: String, required: true },
  event: { type: String, required: true },
});

const ConferenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: {
    venue: { type: String, required: true },
    hall: { type: String, required: true },
    address: { type: String, required: true },
  },
  description: { type: String, required: true },
  speakers: [SpeakerSchema],
  agendas: [AgendaSchema],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Array of participant IDs
});

// Transform _id to id
ConferenceSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id; // Replace _id with id
    delete ret._id; // Remove _id field
    delete ret.__v; // Remove __v field
  },
});

const Conference = mongoose.model("Conference", ConferenceSchema);

module.exports = Conference;
