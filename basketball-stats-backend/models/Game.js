const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  opponent: { type: String, required: true },
  location: { type: String, enum: ["home", "away"], required: true },
  result: { type: String }, // π.χ. "W 95-88"
  playersStats: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
      points: Number,
      assists: Number,
      rebounds: Number,
      steals: Number,
      blocks: Number
    }
  ]
});

module.exports = mongoose.model("Game", gameSchema);
