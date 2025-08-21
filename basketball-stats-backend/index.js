// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("DB connection error:", err));

const Team = require("./models/Team");
const Player = require("./models/Player");

// Routes placeholder
app.get("/", (req, res) => {
  res.send("Basketball Stats API running");
});

const playerRoutes = require("./routes/playerRoutes");
app.use("/api/players", playerRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const gameRoutes = require("./routes/gameRoutes");
app.use("/api/games", gameRoutes);

const teamRoutes = require("./routes/teamRoutes");

app.use("/api/teams", teamRoutes);

const dashboardRoutes = require("./routes/dashboardRoutes");

app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// const sampleTeams = [
//   { name: "Real Madrid", city: "Madrid", founded: 1931, championships: 11 },
//   { name: "FC Barcelona", city: "Barcelona", founded: 1926, championships: 2 },
//   { name: "Olympiacos", city: "Piraeus", founded: 1931, championships: 3 },
//   { name: "Anadolu Efes", city: "Istanbul", founded: 1976, championships: 2 },
//   { name: "Fenerbahçe", city: "Istanbul", founded: 1913, championships: 2 },
//   { name: "Panathinaikos", city: "Athens", founded: 1919, championships: 7 },
// ];

// const samplePlayers = [
//   // ... other teams' players
//   {
//     name: "Kendrick Nunn",
//     teamName: "Panathinaikos",
//     position: "Guard",
//     height: 1.91,
//     weight: 85,
//     stats: [
//       {
//         gameDate: new Date("2025-03-14"),
//         opponent: "FC Barcelona",
//         points: 18,
//         assists: 10,
//         rebounds: 3,
//         steals: 2,
//       },
//       {
//         gameDate: new Date("2025-03-21"),
//         opponent: "Fenerbahçe",
//         points: 14,
//         assists: 9,
//         rebounds: 4,
//         steals: 1,
//       },
//     ],
//   },
//   {
//     name: "Mathias Lessort",
//     teamName: "Panathinaikos",
//     position: "Center",
//     height: 2.06,
//     weight: 115,
//     stats: [
//       {
//         gameDate: new Date("2025-02-28"),
//         opponent: "Olympiacos",
//         points: 22,
//         assists: 4,
//         rebounds: 6,
//       },
//       {
//         gameDate: new Date("2025-03-07"),
//         opponent: "Anadolu Efes",
//         points: 19,
//         assists: 3,
//         rebounds: 5,
//       },
//     ],
//   },
//   {
//     name: "Juancho Hernangómez",
//     teamName: "Panathinaikos",
//     position: "Forward",
//     height: 2.05,
//     weight: 100,
//     stats: [
//       {
//         gameDate: new Date("2025-02-22"),
//         opponent: "Anadolu Efes",
//         points: 13,
//         assists: 8,
//         rebounds: 4,
//         steals: 2,
//       },
//       {
//         gameDate: new Date("2025-03-08"),
//         opponent: "FC Barcelona",
//         points: 10,
//         assists: 9,
//         rebounds: 5,
//       },
//     ],
//   },

//   // Real Madrid
//   {
//     name: "Facundo Campazzo",
//     teamName: "Real Madrid",
//     position: "Guard",
//     height: 181,
//     weight: 84,
//     stats: [
//       {
//         gameDate: new Date("2025-03-14"),
//         opponent: "FC Barcelona",
//         points: 18,
//         assists: 10,
//         rebounds: 3,
//         steals: 2,
//       },
//       {
//         gameDate: new Date("2025-03-21"),
//         opponent: "Fenerbahçe",
//         points: 14,
//         assists: 9,
//         rebounds: 4,
//         steals: 1,
//       },
//     ],
//   },
//   {
//     name: "Dzanan Musa",
//     teamName: "Real Madrid",
//     position: "Guard-Forward",
//     height: 205,
//     weight: 95,
//     stats: [
//       {
//         gameDate: new Date("2025-02-28"),
//         opponent: "Olympiacos",
//         points: 22,
//         assists: 4,
//         rebounds: 6,
//       },
//       {
//         gameDate: new Date("2025-03-07"),
//         opponent: "Anadolu Efes",
//         points: 19,
//         assists: 3,
//         rebounds: 5,
//       },
//     ],
//   },
//   {
//     name: "Walter Tavares",
//     teamName: "Real Madrid",
//     position: "Center",
//     height: 220,
//     weight: 120,
//     stats: [
//       {
//         gameDate: new Date("2025-02-20"),
//         opponent: "Fenerbahçe",
//         points: 12,
//         rebounds: 12,
//         blocks: 3,
//       },
//       {
//         gameDate: new Date("2025-03-02"),
//         opponent: "FC Barcelona",
//         points: 16,
//         rebounds: 14,
//         blocks: 2,
//       },
//     ],
//   },

//   // FC Barcelona
//   {
//     name: "Nicolás Laprovíttola",
//     teamName: "FC Barcelona",
//     position: "Guard",
//     height: 190,
//     weight: 82,
//     stats: [
//       {
//         gameDate: new Date("2025-02-18"),
//         opponent: "Real Madrid",
//         points: 20,
//         assists: 7,
//         rebounds: 3,
//       },
//       {
//         gameDate: new Date("2025-03-11"),
//         opponent: "Fenerbahçe",
//         points: 16,
//         assists: 6,
//         rebounds: 2,
//       },
//     ],
//   },
//   {
//     name: "Tomáš Satoranský",
//     teamName: "FC Barcelona",
//     position: "Guard",
//     height: 201,
//     weight: 95,
//     stats: [
//       {
//         gameDate: new Date("2025-01-31"),
//         opponent: "Olympiacos",
//         points: 11,
//         assists: 8,
//         rebounds: 5,
//       },
//       {
//         gameDate: new Date("2025-02-27"),
//         opponent: "Anadolu Efes",
//         points: 13,
//         assists: 9,
//         rebounds: 6,
//       },
//     ],
//   },
//   {
//     name: "Jan Veselý",
//     teamName: "FC Barcelona",
//     position: "Forward-Center",
//     height: 213,
//     weight: 109,
//     stats: [
//       {
//         gameDate: new Date("2025-03-05"),
//         opponent: "Fenerbahçe",
//         points: 15,
//         rebounds: 9,
//         blocks: 1,
//       },
//       {
//         gameDate: new Date("2025-03-19"),
//         opponent: "Real Madrid",
//         points: 12,
//         rebounds: 10,
//         blocks: 2,
//       },
//     ],
//   },

//   // Olympiacos
//   {
//     name: "Thomas Walkup",
//     teamName: "Olympiacos",
//     position: "Guard",
//     height: 193,
//     weight: 91,
//     stats: [
//       {
//         gameDate: new Date("2025-02-22"),
//         opponent: "Anadolu Efes",
//         points: 13,
//         assists: 8,
//         rebounds: 4,
//         steals: 2,
//       },
//       {
//         gameDate: new Date("2025-03-08"),
//         opponent: "FC Barcelona",
//         points: 10,
//         assists: 9,
//         rebounds: 5,
//       },
//     ],
//   },
//   {
//     name: "Moustapha Fall",
//     teamName: "Olympiacos",
//     position: "Center",
//     height: 218,
//     weight: 122,
//     stats: [
//       {
//         gameDate: new Date("2025-02-10"),
//         opponent: "Fenerbahçe",
//         points: 12,
//         rebounds: 11,
//         blocks: 2,
//       },
//       {
//         gameDate: new Date("2025-03-01"),
//         opponent: "Real Madrid",
//         points: 9,
//         rebounds: 13,
//         blocks: 3,
//       },
//     ],
//   },
//   {
//     name: "Kostas Papanikolaou",
//     teamName: "Olympiacos",
//     position: "Forward",
//     height: 204,
//     weight: 100,
//     stats: [
//       {
//         gameDate: new Date("2025-02-16"),
//         opponent: "FC Barcelona",
//         points: 14,
//         rebounds: 6,
//         assists: 3,
//       },
//       {
//         gameDate: new Date("2025-03-13"),
//         opponent: "Anadolu Efes",
//         points: 12,
//         rebounds: 7,
//         assists: 2,
//       },
//     ],
//   },

//   // Anadolu Efes
//   {
//     name: "Shane Larkin",
//     teamName: "Anadolu Efes",
//     position: "Guard",
//     height: 180,
//     weight: 79,
//     stats: [
//       {
//         gameDate: new Date("2025-02-12"),
//         opponent: "Real Madrid",
//         points: 24,
//         assists: 6,
//         rebounds: 4,
//         steals: 2,
//       },
//       {
//         gameDate: new Date("2025-02-26"),
//         opponent: "Olympiacos",
//         points: 19,
//         assists: 7,
//         rebounds: 3,
//       },
//     ],
//   },
//   {
//     name: "Rodrigue Beaubois",
//     teamName: "Anadolu Efes",
//     position: "Guard",
//     height: 188,
//     weight: 84,
//     stats: [
//       {
//         gameDate: new Date("2025-01-30"),
//         opponent: "Fenerbahçe",
//         points: 17,
//         assists: 3,
//         rebounds: 4,
//       },
//       {
//         gameDate: new Date("2025-03-06"),
//         opponent: "FC Barcelona",
//         points: 15,
//         assists: 4,
//         rebounds: 3,
//       },
//     ],
//   },
//   {
//     name: "Ante Žižić",
//     teamName: "Anadolu Efes",
//     position: "Center",
//     height: 211,
//     weight: 120,
//     stats: [
//       {
//         gameDate: new Date("2025-02-07"),
//         opponent: "Olympiacos",
//         points: 12,
//         rebounds: 10,
//         blocks: 1,
//       },
//       {
//         gameDate: new Date("2025-03-15"),
//         opponent: "Real Madrid",
//         points: 10,
//         rebounds: 9,
//         blocks: 2,
//       },
//     ],
//   },

//   // Fenerbahçe
//   {
//     name: "Marko Gudurić",
//     teamName: "Fenerbahçe",
//     position: "Guard-Forward",
//     height: 196,
//     weight: 95,
//     stats: [
//       {
//         gameDate: new Date("2025-02-05"),
//         opponent: "Anadolu Efes",
//         points: 21,
//         assists: 5,
//         rebounds: 4,
//       },
//       {
//         gameDate: new Date("2025-02-25"),
//         opponent: "Real Madrid",
//         points: 16,
//         assists: 6,
//         rebounds: 5,
//       },
//     ],
//   },
//   {
//     name: "Scottie Wilbekin",
//     teamName: "Fenerbahçe",
//     position: "Guard",
//     height: 188,
//     weight: 86,
//     stats: [
//       {
//         gameDate: new Date("2025-02-19"),
//         opponent: "FC Barcelona",
//         points: 19,
//         assists: 7,
//         rebounds: 3,
//       },
//       {
//         gameDate: new Date("2025-03-12"),
//         opponent: "Olympiacos",
//         points: 14,
//         assists: 8,
//         rebounds: 2,
//       },
//     ],
//   },
//   {
//     name: "Nigel Hayes-Davis",
//     teamName: "Fenerbahçe",
//     position: "Forward",
//     height: 203,
//     weight: 104,
//     stats: [
//       {
//         gameDate: new Date("2025-02-02"),
//         opponent: "Real Madrid",
//         points: 22,
//         rebounds: 7,
//         assists: 2,
//       },
//       {
//         gameDate: new Date("2025-03-09"),
//         opponent: "Anadolu Efes",
//         points: 18,
//         rebounds: 8,
//         assists: 3,
//       },
//     ],
//   },
// ];

// // ✅ Seeder function
// async function seedDatabase() {
//   try {
//     // Clear old data
//     await Team.deleteMany({});
//     await Player.deleteMany({});

//     console.log("Old data cleared.");

//     // Insert teams
//     const createdTeams = await Team.insertMany(sampleTeams);
//     console.log(
//       "Teams created:",
//       createdTeams.map((t) => t.name)
//     );

//     // Create a map of team names -> IDs
//     const teamMap = createdTeams.reduce((map, team) => {
//       map[team.name] = team._id;
//       return map;
//     }, {});

//     // Assign players to their correct teams based on teamName
//     const playersWithTeams = samplePlayers.map((player) => {
//       const teamId = teamMap[player.teamName];
//       return {
//         ...player,
//         team: teamId,
//       };
//     });

//     // Insert players
//     const createdPlayers = await Player.insertMany(playersWithTeams);
//     console.log(
//       "Players created:",
//       createdPlayers.map((p) => p.name)
//     );

//     // Update teams with player references
//     for (const team of createdTeams) {
//       const teamPlayers = createdPlayers.filter((p) => p.team.equals(team._id));
//       team.players = teamPlayers.map((p) => p._id);
//       await team.save();
//     }

//     console.log("Teams updated with players.");

//     process.exit(); // ✅ Exit when done
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seedDatabase();
