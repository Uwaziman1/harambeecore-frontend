// src/App.jsx
import { useState } from "react";
import axios from "axios";

function App() {
  const [mode, setMode] = useState("historic");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setMode((prev) => (prev === "historic" ? "live" : "historic"));
  };

  const runPipeline = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8000/run?mode=${mode}`);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setResult({ error: "Failed to connect to backend." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">HarambeeCore Pipeline</h1>

      <div className="flex items-center space-x-4 mb-6">
        <span className="font-medium">Mode:</span>
        <button
          className={`px-4 py-2 rounded-full font-semibold ${
            mode === "historic" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={handleToggle}
        >
          {mode === "historic" ? "Historic" : "Live"}
        </button>
      </div>

      <button
        onClick={runPipeline}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded mb-6"
        disabled={loading}
      >
        {loading ? "Running..." : "Run Pipeline"}
      </button>

      {result && (
        <div className="w-full max-w-xl bg-white shadow p-4 rounded border">
          <pre className="text-sm whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
