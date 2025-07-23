import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [mode, setMode] = useState("historical");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/simulate?mode=${mode}`
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      setData(result.milestones || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch simulation data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [mode]);

  return (
    <div className="App">
      <h1>Pipeline Simulation</h1>

      <div>
        <label>Mode: </label>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="historical">Historical</option>
          <option value="live">Live</option>
        </select>
      </div>

      {loading && <p>Loading simulation...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {data.map((milestone, index) => (
            <li key={index}>
              <strong>{milestone.name}</strong>: ${milestone.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
