// models/Team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  founded: Number,
  championships: Number,
  wins: { type: Number, default: 0 },
  defeats: { type: Number, default: 0 },
  homeWins: { type: Number, default: 0 },
  homeDefeats: { type: Number, default: 0 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
});

module.exports = mongoose.model("Team", teamSchema);
