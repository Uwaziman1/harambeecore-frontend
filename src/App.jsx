import { useState, useEffect } from "react";
import "./styles/index.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [mode, setMode] = useState("historical");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMode = () => {
    const newMode = mode === "historical" ? "live" : "historical";
    setMode(newMode);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const fetchSimulation = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://harambeecore-cloud-1.onrender.com/simulate?mode=${mode}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: "Failed to fetch simulation." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">HarambeeCore Simulator</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded shadow"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={toggleMode}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          Switch to {mode === "historical" ? "Live" : "Historical"} Mode
        </button>
      </div>

      <div className="mb-6">
        <button
          onClick={fetchSimulation}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded"
        >
          Run Simulation
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {result && (
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default App;
