const mongoose = require("mongoose");

// 📌 Schema για τα στατιστικά κάθε αγώνα
const statSchema = new mongoose.Schema({
  gameDate: { type: Date, required: true },
  opponent: { type: String },
  points: Number,
  assists: Number,
  rebounds: Number,
  blocks: Number,
  steals: Number
}, { _id: false });

// 📌 Schema για τον παίκτη
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ✅ Σύνδεση με ομάδα (ObjectId ref)
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  position: { type: String },
  height: Number,
  weight: Number,
  stats: [statSchema]
});

module.exports = mongoose.model("Player", playerSchema);
