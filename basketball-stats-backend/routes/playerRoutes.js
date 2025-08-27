const express = require("express");
const Player = require("../models/Player");
const Team = require("../models/Team");
const router = express.Router();

// 📌 Δημιουργία παίκτη + σύνδεση με ομάδα
router.post("/", async (req, res) => {
  try {
    const {
      name,
      team,
      position,
      height,
      weight,
      gameStats,
      points,
      assists,
      rebounds,
      offensiveRebounds,
      defensiveRebounds,
      blocks,
      steals,
      fieldGoalsMade,
      fieldGoalsAttempted,
      threePointsMade,
      threePointsAttempted,
      freeThrowsMade,
      freeThrowsAttempted,
      turnovers,
      personalFouls,
      minutesPlayed,
    } = req.body;

    let teamObject = null;

    if (team) {
      // trim whitespace from the input
      const cleanTeam = team.trim();

      // case-insensitive regex match
      teamObject = await Team.findOne({
        name: { $regex: `^${cleanTeam}$`, $options: "i" },
      });

      if (!teamObject) {
        return res
          .status(404)
          .json({ message: `Team '${cleanTeam}' not found` });
      }
    }

    // Δημιουργούμε τον παίκτη
    const player = new Player({
      name,
      team: teamObject._id || null,
      position,
      height,
      weight,
      gameStats: gameStats || [],
      points,
      assists,
      rebounds,
      offensiveRebounds,
      defensiveRebounds,
      blocks,
      steals,
      fieldGoalsMade,
      fieldGoalsAttempted,
      threePointsMade,
      threePointsAttempted,
      freeThrowsMade,
      freeThrowsAttempted,
      turnovers,
      personalFouls,
      minutesPlayed,
    });

    await player.save();

    // Αν δόθηκε teamId, προσθέτουμε τον παίκτη στην ομάδα
    if (teamObject._id) {
      await Team.findByIdAndUpdate(teamObject._id, {
        $push: { players: player._id },
      });
    }

    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Λίστα όλων των παικτών
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sort = "name",
      order = "asc",
    } = req.query;

    // Convert page & limit to numbers
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);

    // Build search filter
    const searchFilter = search
      ? { name: { $regex: search, $options: "i" } } // case-insensitive search on name
      : {};

    const pipeline = [
      { $match: searchFilter },
      {
        $addFields: {
          fgPercent: {
            $cond: [
              { $eq: ["$fieldGoalsAttempted", 0] },
              0,
              { $divide: ["$fieldGoalsMade", "$fieldGoalsAttempted"] },
            ],
          },
          threePtPercent: {
            $cond: [
              { $eq: ["$threePointsAttempted", 0] },
              0,
              { $divide: ["$threePointsMade", "$threePointsAttempted"] },
            ],
          },
          ftPercent: {
            $cond: [
              { $eq: ["$freeThrowsAttempted", 0] },
              0,
              { $divide: ["$freeThrowsMade", "$freeThrowsAttempted"] },
            ],
          },
        },
      },
      // Lookup team name
      {
        $lookup: {
          from: "teams", // the Team collection name in MongoDB
          localField: "team",
          foreignField: "_id",
          as: "teamDoc",
        },
      },
      // Unwind team array to object
      { $unwind: { path: "$teamDoc", preserveNullAndEmptyArrays: true } },
      // Replace team field with just the name
      {
        $addFields: {
          team: "$teamDoc.name",
        },
      },
      { $sort: { [sort]: order === "asc" ? 1 : -1 } },
      { $skip: (pageNumber - 1) * pageSize },
      { $limit: pageSize },
    ];

    const players = await Player.aggregate(pipeline);
    const total = await Player.countDocuments(searchFilter);

    res.json({
      data: players,
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// 📌 Εμφάνιση παίκτη με ID
router.get("/:id", async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("team");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 📌 Ενημέρωση παίκτη
router.put("/:id", async (req, res) => {
  try {
    const { teamId, ...updateData } = req.body;

    const player = await Player.findById(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    // Αν αλλάζει ομάδα, αφαιρούμε από την παλιά και βάζουμε στη νέα
    if (teamId && teamId !== player.team?.toString()) {
      if (player.team) {
        await Team.findByIdAndUpdate(player.team, {
          $pull: { players: player._id },
        });
      }
      await Team.findByIdAndUpdate(teamId, {
        $push: { players: player._id },
      });
      player.team = teamId;
    }

    Object.assign(player, updateData);
    await player.save();

    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📌 Διαγραφή παίκτη
router.delete("/:id", async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) return res.status(404).json({ message: "Player not found" });

    // Αν ο παίκτης είχε ομάδα, τον αφαιρούμε
    if (player.team) {
      await Team.findByIdAndUpdate(player.team, {
        $pull: { players: player._id },
      });
    }

    res.json({ message: "Player deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
