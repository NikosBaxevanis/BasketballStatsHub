import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

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

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get<Player[]>("/api/players");
        setPlayers(res.data);
      } catch (err) {
        console.error("Error fetching players", err);
      }
    };

    fetchPlayers();
  }, []);

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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {canEdit && (
        <form onSubmit={handleAddPlayer} className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Add Player</h2>
          <input
            type="text"
            placeholder="Name"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            className="border px-2 py-1 mr-2"
            required
          />
          <input
            type="text"
            placeholder="Team"
            value={newPlayer.team}
            onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
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
      )}

      <ul>
        {players.map((player) => (
          <li key={player._id} className="mb-2 border-b pb-1">
            <strong>{player.name}</strong> - <em>{player.team}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
