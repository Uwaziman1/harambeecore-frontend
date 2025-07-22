import React, { useEffect, useState } from "react";
import "./styles/index.css"; // Ensure this file exists

function App() {
  const [data, setData] = useState(null);
  const [mode, setMode] = useState("historical");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://harambeecore-cloud-1.onrender.com/simulate?mode=${mode}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, [mode]);

  return (
    <div className="min-h-screen p-4 bg-gray-100 text-gray-800">
      <h1 className="text-2xl font-bold mb-4">HarambeeCore Dashboard</h1>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode("historical")}
          className={`px-4 py-2 rounded ${
            mode === "historical" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Historical
        </button>
        <button
          onClick={() => setMode("live")}
          className={`px-4 py-2 rounded ${
            mode === "live" ? "bg-blue-600 text-white" : "bg-white border"
          }`}
        >
          Live
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : data?.error ? (
        <pre className="text-red-600">{data.error}</pre>
      ) : (
        <pre className="bg-white p-4 rounded shadow overflow-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
