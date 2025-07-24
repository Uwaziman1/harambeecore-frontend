// src/App.jsx

import { useEffect, useState } from "react";
import { fetchAnalysis } from "./api";
import { FileText, CreditCard, BarChart2 } from "lucide-react";

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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
        <BarChart2 className="text-indigo-600" size={28} />
        XAU/USD Analysis
      </h1>

      <section>
        <h2 className="text-xl font-semibold text-blue-600 flex items-center gap-2">
          <FileText size={22} />
          Contracts
        </h2>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
          {data.contracts.map((contract, idx) => (
            <li key={idx}>{contract}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-green-600 flex items-center gap-2">
          <CreditCard size={22} />
          Payments
        </h2>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-700">
          {data.payments.map((payment, idx) => (
            <li key={idx}>{payment}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-purple-600 flex items-center gap-2">
          <BarChart2 size={22} />
          Summary
        </h2>
        <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 whitespace-pre-wrap mt-2">
          {JSON.stringify(data.summary, null, 2)}
        </pre>
      </section>
    </div>
  );
}

export default App;
