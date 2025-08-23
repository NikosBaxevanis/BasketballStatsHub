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
      { $unwind: "$gameStats" },
      { $count: "totalGames" },
    ]);
    const gamesPlayed =
      gamesPlayedAgg.length > 0 ? gamesPlayedAgg[0].totalGames : 0;

    // 4) Season Average PPG (total points ÷ total games)
    const pointsAgg = await Player.aggregate([
      { $unwind: "$gameStats" },
      {
        $group: {
          _id: null,
          totalPoints: { $sum: "$gameStats.points" },
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

// Get dashboard stats
router.get("/league-stats", async (req, res) => {
  try {
    // Aggregate player totals
    const leagueStats = await Player.aggregate([
      {
        $group: {
          _id: null,
          totalPoints: { $sum: "$points" },
          totalAssists: { $sum: "$assists" },
          totalRebounds: { $sum: "$rebounds" },
          totalTurnovers: { $sum: "$turnovers" },
          totalSteals: { $sum: "$steals" },
          totalBlocks: { $sum: "$blocks" },
          totalGames: { $sum: { $size: "$gameStats" } }, // count all games
        },
      },
      {
        $project: {
          _id: 0,
          leagueAPG: {
            $cond: [
              { $eq: ["$totalGames", 0] },
              0,
              { $divide: ["$totalAssists", "$totalGames"] },
            ],
          },
          leaguePPG: {
            $cond: [
              { $eq: ["$totalGames", 0] },
              0,
              { $divide: ["$totalPoints", "$totalGames"] },
            ],
          },
          leagueRPG: {
            $cond: [
              { $eq: ["$totalGames", 0] },
              0,
              { $divide: ["$totalRebounds", "$totalGames"] },
            ],
          },
          leagueTOPG: {
            $cond: [
              { $eq: ["$totalGames", 0] },
              0,
              { $divide: ["$totalTurnovers", "$totalGames"] },
            ],
          },
          leagueSPG: {
            $cond: [
              { $eq: ["$totalGames", 0] },
              0,
              { $divide: ["$totalSteals", "$totalGames"] },
            ],
          },
          leagueBPG: {
            $cond: [
              { $eq: ["$totalGames", 0] },
              0,
              { $divide: ["$totalBlocks", "$totalGames"] },
            ],
          },
        },
      },
    ]);

    res.json(leagueStats[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/leaders", async (req, res) => {
  try {
    // Fetch all players with team info
    const players = await Player.find().populate("team", "name");

    // Helper to get the leader for a stat
    const getLeader = (statFn) => {
      const sorted = [...players].sort((a, b) => statFn(b) - statFn(a));
      const top = sorted[0];
      return top
        ? {
            leader: top.name,
            value: statFn(top),
            team: top.team?.name || "Unknown",
          }
        : null;
    };

    const leaders = {
      PPG: getLeader((p) =>
        p.gameStats.length ? (p.points / p.gameStats.length).toFixed(1) : 0
      ),
      RPG: getLeader((p) =>
        p.gameStats.length ? (p.rebounds / p.gameStats.length).toFixed(1) : 0
      ),
      APG: getLeader((p) =>
        p.gameStats.length ? (p.assists / p.gameStats.length).toFixed(1) : 0
      ),
      FGPercent: getLeader((p) =>
        p.fieldGoalsAttempted
          ? ((p.fieldGoalsMade / p.fieldGoalsAttempted) * 100).toFixed(1)
          : 0
      ),
      ThreePtPercent: getLeader((p) =>
        p.threePointsAttempted
          ? ((p.threePointsMade / p.threePointsAttempted) * 100).toFixed(1)
          : 0
      ),
      FTPercent: getLeader((p) =>
        p.freeThrowsAttempted
          ? ((p.freeThrowsMade / p.freeThrowsAttempted) * 100).toFixed(1)
          : 0
      ),
    };

    res.json(leaders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
