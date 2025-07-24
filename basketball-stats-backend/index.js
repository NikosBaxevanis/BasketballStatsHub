// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());



// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("DB connection error:", err));

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


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
