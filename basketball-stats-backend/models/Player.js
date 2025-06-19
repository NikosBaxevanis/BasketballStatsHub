const mongoose = require("mongoose");

const statSchema = new mongoose.Schema({
  gameDate: { type: Date, required: true },
  opponent: { type: String },
  points: Number,
  assists: Number,
  rebounds: Number,
  blocks: Number,
  steals: Number
}, { _id: false });

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: String },
  position: { type: String },
  height: Number,
  weight: Number,
  stats: [statSchema]
});

module.exports = mongoose.model("Player", playerSchema);
