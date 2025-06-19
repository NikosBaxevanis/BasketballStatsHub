const express = require("express");
const router = express.Router();
const Game = require("../models/Game");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await Game.find().populate("playersStats.player");
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single game
router.get("/:id", async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("playersStats.player");
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create game
router.post("/", verifyToken, isAdmin, async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const saved = await newGame.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update game
router.put("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const updated = await Game.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Game not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete game
router.delete("/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const deleted = await Game.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
