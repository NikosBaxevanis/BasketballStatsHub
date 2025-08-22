const mongoose = require("mongoose");

// 📌 Schema για τα στατιστικά κάθε αγώνα
const statSchema = new mongoose.Schema(
  {
    gameDate: { type: Date, required: true },
    opponent: { type: String },
    points: Number,
    assists: Number,
    rebounds: Number,
    blocks: Number,
    steals: Number,
  },
  { _id: false }
);

// 📌 Schema για τον παίκτη
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ✅ Σύνδεση με ομάδα (ObjectId ref)
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  position: { type: String },
  height: Number,
  weight: Number,
  gameStats: [statSchema],
  points: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  rebounds: { type: Number, default: 0 },
  offensiveRebounds: { type: Number, default: 0 },
  defensiveRebounds: { type: Number, default: 0 },
  blocks: { type: Number, default: 0 },
  steals: { type: Number, default: 0 },
  fieldGoalsMade: { type: Number, default: 0 },
  fieldGoalsAttempted: { type: Number, default: 0 },
  threePointsMade: { type: Number, default: 0 },
  threePointsAttempted: { type: Number, default: 0 },
  freeThrowsMade: { type: Number, default: 0 },
  freeThrowsAttempted: { type: Number, default: 0 },
  turnovers: { type: Number, default: 0 },
  personalFouls: { type: Number, default: 0 },
  minutesPlayed: { type: Number, default: 0 },
});

module.exports = mongoose.model("Player", playerSchema);
