import React, { useState } from "react";

function SimulationRunner() {
  const [mode, setMode] = useState("historic");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://harambeecore-cloud-1.onrender.com/run?mode=${mode}`);
      
      // Optional: log raw response
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      setResult(data);
      console.log("Pipeline result:", data);
    } catch (error) {
      console.error("Simulation error:", error.message);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Run HarambeeCore Pipeline</h1>
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="border rounded p-2 mb-4"
      >
        <option value="historic">Historic</option>
        <option value="live">Live</option>
      </select>
      <button
        onClick={runSimulation}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Simulation"}
      </button>

      {result && (
        <pre className="mt-6 bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default SimulationRunner;
