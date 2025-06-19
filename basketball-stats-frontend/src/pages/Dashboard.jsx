import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

// Υποθετικό UserContext για να πάρουμε τον logged-in χρήστη
const UserContext = React.createContext();

function Dashboard() {
  const user = useContext(UserContext); // Παίρνουμε user από context
  const canEdit = user?.role === "admin";

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({ name: "", team: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Φόρτωση παικτών από backend όταν φορτώνει το component
  useEffect(() => {
    axios.get("/api/players")
      .then(res => {
        setPlayers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Error loading players");
        setLoading(false);
      });
  }, []);

  // Υποβολή φόρμας για προσθήκη παίκτη
  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/players", newPlayer);
      setPlayers(prev => [...prev, res.data]);
      setNewPlayer({ name: "", team: "" });
    } catch (err) {
      console.error("Error adding player", err);
      alert("Failed to add player");
    }
  };

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Players Dashboard</h1>

      {canEdit && (
        <form onSubmit={handleAddPlayer} className="mb-6 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Add Player</h3>
          <input
            type="text"
            placeholder="Name"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
            className="border px-2 py-1 mr-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Team"
            value={newPlayer.team}
            onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
            className="border px-2 py-1 mr-2 rounded"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
            Add
          </button>
        </form>
      )}

      <ul>
        {players.map(player => (
          <li key={player._id} className="mb-2 border-b pb-1">
            <strong>{player.name}</strong> - {player.team}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
