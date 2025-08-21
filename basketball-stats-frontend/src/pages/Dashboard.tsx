import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "../types";
import { fetchDashboardStats } from "../api/endpoints/dashboard";

interface Player {
  _id: string;
  name: string;
  team: string;
}

const Dashboard: React.FC = () => {
  const { user } = useContext(UserContext);
  const [players, setPlayers] = useState<Player[]>([]);
  const [newPlayer, setNewPlayer] = useState({ name: "", team: "" });
  const canEdit = user?.role === "admin";

  const { data, isLoading, isError, error } = useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
    staleTime: 1000 * 60, // 1 minute cache
  });

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError)
    return <p>{(error as any)?.message || "Failed to load dashboard"}</p>;

  console.log(data);
  const { activePlayers, seasonAvgPPG, gamesPlayed, totalTeams } = data ?? {};

  const handleAddPlayer = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post<Player>("/api/players", newPlayer);
      setPlayers((prev) => [...prev, res.data]);
      setNewPlayer({ name: "", team: "" });
    } catch (err) {
      console.error("Error adding player", err);
    }
  };

  return (
    <div>
      <div className="py-8 p-4 bg-white rounded-xl m-4 flex flex-col items-center justify-center gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="text-center">
          <h1 className="text-slate-900 text-4xl font-bold mb-2">
            🏀 Basketball Stats Hub
          </h1>
          <p className="text-slate-500 text-lg">
            Your Ultimate Basketball Statistics Dashboard
          </p>
        </div>
        <nav className="flex justify-center gap-6 flex-wrap">
          <button className="nav-btn active">Home</button>
          <button className="nav-btn">Teams</button>
          <button className="nav-btn">Players</button>
          <button className="nav-btn">League Stats</button>
        </nav>
      </div>
      <div className="py-8 p-4 bg-white rounded-xl m-4 flex flex-col items-center justify-center gap-[80px] shadow-[0_1px_3px_rgba(0,0,0,0.1)] border border-slate-200">
        <div className="text-center">
          <h2 className="text-slate-900 text-2xl font-bold mb-2">
            Welcome to Basketball Stats Hub
          </h2>
          <p className="text-slate-500 text-lg">
            Track teams, players, and comprehensive basketball statistics all in
            one place
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5 w-full">
          <div className="stat-card">
            <h3>Total Teams</h3>
            <div className="number">{totalTeams}</div>
          </div>
          <div className="stat-card">
            <h3>Active Players</h3>
            <div className="number">{activePlayers}</div>
          </div>
          <div className="stat-card">
            <h3>Games Played</h3>
            <div className="number">{gamesPlayed}</div>
          </div>
          <div className="stat-card">
            <h3>Season Average PPG</h3>
            <div className="number">{seasonAvgPPG}</div>
          </div>
        </div>
        <div className="w-full grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-5 text-center">
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Team Management</h3>
            <p>
              Comprehensive team statistics, records, and performance metrics
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👤</div>
            <h3>Player Profiles</h3>
            <p>
              Detailed player statistics, career highlights, and performance
              data
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>In-depth statistical analysis and performance comparisons</p>
          </div>
        </div>
      </div>

      {/* {canEdit && (
        <form onSubmit={handleAddPlayer} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Add Player</h2>
          <input
            type="text"
            placeholder="Name"
            value={newPlayer.name}
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, name: e.target.value })
            }
            className="border px-2 py-1 mr-2"
            required
          />
          <input
            type="text"
            placeholder="Team"
            value={newPlayer.team}
            onChange={(e) =>
              setNewPlayer({ ...newPlayer, team: e.target.value })
            }
            className="border px-2 py-1 mr-2"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>
      )} */}

      {/* <ul>
        {players.map((player) => (
          <li key={player._id} className="mb-2 border-b pb-1">
            <strong>{player.name}</strong> - <em>{player.team}</em>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Dashboard;
