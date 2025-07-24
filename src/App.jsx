// src/App.jsx

import { useEffect, useState } from "react";
import { fetchAnalysis } from "./api";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchAnalysis();
      setData(result);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div className="p-4 text-xl">Loading...</div>;

  if (!data) return <div className="p-4 text-red-500">Failed to load data.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">📊 XAU/USD Analysis</h1>

      <section>
        <h2 className="text-xl font-semibold text-blue-600">Contracts</h2>
        <ul className="list-disc ml-5">
          {data.contracts.map((contract, idx) => (
            <li key={idx}>{contract}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600">Payments</h2>
        <ul className="list-disc ml-5">
          {data.payments.map((payment, idx) => (
            <li key={idx}>{payment}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-purple-600">Summary</h2>
        <pre className="bg-gray-100 p-3 rounded text-sm text-gray-800 whitespace-pre-wrap">
          {JSON.stringify(data.summary, null, 2)}
        </pre>
      </section>
    </div>
  );
}

export default App;
