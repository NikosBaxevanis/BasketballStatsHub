const express = require("express");
const Team = require("../models/Team");
const Player = require("../models/Player");
const router = express.Router();

// 📌 Δημιουργία νέας ομάδας
router.post("/", async (req, res) => {
  try {
    const { name, city, founded, championships } = req.body;

    const team = new Team({
      name,
      city,
      founded,
      championships,
      players: [] // ξεκινάει χωρίς παίκτες
    });

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Λίστα όλων των ομάδων με παίκτες
router.get("/", async (req, res) => {
  try {
    const teams = await Team.find().populate("players");
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Εμφάνιση ομάδας με ID (και παικτών)
router.get("/:id", async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players");
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Ενημέρωση ομάδας
router.put("/:id", async (req, res) => {
  try {
    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("players");
    if (!updatedTeam) return res.status(404).json({ message: "Team not found" });
    res.json(updatedTeam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Διαγραφή ομάδας + αφαίρεση αναφοράς από παίκτες
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) return res.status(404).json({ message: "Team not found" });

    // Αφαιρούμε την ομάδα από τους παίκτες
    await Player.updateMany(
      { team: deletedTeam._id },
      { $unset: { team: "" } }
    );

    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
