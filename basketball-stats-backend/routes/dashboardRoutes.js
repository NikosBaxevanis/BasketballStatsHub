const express = require("express");
const router = express.Router();
const Player = require("../models/Player");
const Team = require("../models/Team");

// Get dashboard stats
router.get("/", async (req, res) => {
  try {
    // 1) Total Teams
    const totalTeams = await Team.countDocuments();

    // 2) Active Players (players assigned to a team)
    const activePlayers = await Player.countDocuments({ team: { $ne: null } });

    // 3) Games Played (count total stat entries across all players)
    const gamesPlayedAgg = await Player.aggregate([
      { $unwind: "$stats" },
      { $count: "totalGames" },
    ]);
    const gamesPlayed =
      gamesPlayedAgg.length > 0 ? gamesPlayedAgg[0].totalGames : 0;

    // 4) Season Average PPG (total points ÷ total games)
    const pointsAgg = await Player.aggregate([
      { $unwind: "$stats" },
      {
        $group: {
          _id: null,
          totalPoints: { $sum: "$stats.points" },
          totalGames: { $sum: 1 },
        },
      },
    ]);

    let seasonAvgPPG = 0;
    if (pointsAgg.length > 0 && pointsAgg[0].totalGames > 0) {
      seasonAvgPPG = (
        pointsAgg[0].totalPoints / pointsAgg[0].totalGames
      ).toFixed(2);
    }

    // ✅ Send response
    res.json({
      totalTeams,
      activePlayers,
      gamesPlayed,
      seasonAvgPPG,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
