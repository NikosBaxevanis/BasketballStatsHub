const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Get all players (ελεύθερο σε όλους)
router.get("/", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get player by ID (ελεύθερο σε όλους)
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create player (προστατευμένο - μόνο admin)
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const newPlayer = new Player(req.body);
    const saved = await newPlayer.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update player (προστατευμένο - μόνο admin)
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Player.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Player not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete player (προστατευμένο - μόνο admin)
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Player.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Player not found" });
    res.json({ message: "Player deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
