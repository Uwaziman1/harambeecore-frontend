// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  fetchContracts,
  fetchMilestones,
  runSimulation,
} from "./api";

function App() {
  const [mode, setMode] = useState("historic");
  const [simulationResult, setSimulationResult] = useState(null);
  const [contracts, setContracts] = useState([]);
  const [milestones, setMilestones] = useState([]);
  const [activeTab, setActiveTab] = useState("contracts");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRunSimulation = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await runSimulation(mode);
      setSimulationResult(res.data);
    } catch (err) {
      setError(err.message);
      setSimulationResult(null);
    } finally {
      setLoading(false);
    }
  };

  const loadContracts = async () => {
    try {
      const res = await fetchContracts();
      setContracts(res.data);
    } catch (err) {
      console.error("Contracts fetch failed:", err.message);
    }
  };

  const loadMilestones = async () => {
    try {
      const res = await fetchMilestones();
      setMilestones(res.data);
    } catch (err) {
      console.error("Milestones fetch failed:", err.message);
    }
  };

  useEffect(() => {
    loadContracts();
    loadMilestones();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">HarambeeCore Dashboard</h1>

      {/* Simulation Runner */}
      <div className="mb-6">
        <label className="mr-2">Mode:</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="border rounded p-2 mr-2"
        >
          <option value="historic">Historic</option>
          <option value="live">Live</option>
        </select>
        <button
          onClick={handleRunSimulation}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>
      </div>

      {error && (
        <div className="text-red-600 mb-4">Error: {error}</div>
      )}

      {simulationResult && (
        <pre className="bg-gray-100 p-4 rounded mb-6 text-sm overflow-x-auto">
          {JSON.stringify(simulationResult, null, 2)}
        </pre>
      )}

      {/* Tabs */}
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "contracts"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("contracts")}
        >
          Contracts
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "milestones"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("milestones")}
        >
          Milestones
        </button>
      </div>

      {/* Tab content */}
      <div className="overflow-x-auto">
        {activeTab === "contracts" && (
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                {contracts.length > 0 &&
                  Object.keys(contracts[0]).map((key) => (
                    <th
                      key={key}
                      className="border px-4 py-2 text-left bg-gray-100"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract, idx) => (
                <tr key={idx}>
                  {Object.values(contract).map((value, i) => (
                    <td key={i} className="border px-4 py-2">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === "milestones" && (
          <table className="min-w-full bg-white border rounded">
            <thead>
              <tr>
                {milestones.length > 0 &&
                  Object.keys(milestones[0]).map((key) => (
                    <th
                      key={key}
                      className="border px-4 py-2 text-left bg-gray-100"
                    >
                      {key}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone, idx) => (
                <tr key={idx}>
                  {Object.values(milestone).map((value, i) => (
                    <td key={i} className="border px-4 py-2">
                      {String(value)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
