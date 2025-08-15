// models/Team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  founded: Number,
  championships: Number,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }]
});

module.exports = mongoose.model("Team", teamSchema);
