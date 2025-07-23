import React, { useState } from "react";

function App() {
  const [mode, setMode] = useState("historical");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const runSimulation = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch(`https://harambeecore-cloud-1.onrender.com/simulate?mode=${mode}`);
      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to connect to API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">HarambeeCore Simulation</h1>

        <div className="mb-4">
          <label className="mr-4 font-semibold">Select Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="historical">Historical</option>
            <option value="live">Live</option>
          </select>
        </div>

        <button
          onClick={runSimulation}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Running..." : "Run Simulation"}
        </button>

        <div className="mt-6">
          {error && (
            <div className="text-red-600 font-semibold">Error: {error}</div>
          )}

          {result && (
            <div>
              <h2 className="text-lg font-bold mt-4 mb-2">Result:</h2>
              <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-[400px]">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
