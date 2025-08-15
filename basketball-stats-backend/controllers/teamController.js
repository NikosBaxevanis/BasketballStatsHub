// controllers/teamController.js
const Team = require("../models/Team");

// Δημιουργία νέας ομάδας
exports.createTeam = async (req, res) => {
  try {
    const team = new Team(req.body);
    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Λίστα όλων των ομάδων
exports.getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Ενημέρωση ομάδας
exports.updateTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Διαγραφή ομάδας
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) return res.status(404).json({ message: "Team not found" });
    res.json({ message: "Team deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
