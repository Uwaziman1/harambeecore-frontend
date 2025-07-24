// src/api.js

// Simulate a delay to mimic real API
const simulateDelay = (ms) => new Promise((res) => setTimeout(res, ms));

// Mock contracts
const mockContracts = [
  "Contract A - 1kg XAU at $2,350",
  "Contract B - 500g XAU at $2,340",
  "Contract C - 750g XAU at $2,355",
];

// Mock milestone progress
const mockMilestones = [
  { stage: "Deal Signed", status: "✅ Completed" },
  { stage: "Payment Received", status: "✅ Completed" },
  { stage: "Shipment in Transit", status: "🚚 Ongoing" },
  { stage: "Delivery", status: "⏳ Pending" },
];

// Simulated payment records
const mockPayments = [
  "Payment 1: $1,000,000 received on July 5",
  "Payment 2: $850,000 received on July 15",
  "Payment 3: $500,000 pending",
];

// Simulation engine: Calculates projected profit
const runSimulation = () => {
  const currentGoldPrice = 2350; // USD per oz
  const expectedDelivery = 2300; // USD per oz
  const margin = currentGoldPrice - expectedDelivery;
  const projectedVolume = 5000; // in grams
  const profitUSD = (margin / 31.1035) * (projectedVolume / 1000); // oz from g

  return {
    expectedPrice: `$${expectedDelivery}`,
    currentMarket: `$${currentGoldPrice}`,
    projectedProfit: `$${profitUSD.toFixed(2)} USD`,
    notes: "Simulation assumes 5kg delivery and stable market."
  };
};

// Unified analysis fetch
export const fetchAnalysis = async () => {
  await simulateDelay(500); // simulate API delay

  const simulation = runSimulation();

  return {
    contracts: mockContracts,
    payments: mockPayments,
    milestones: mockMilestones,
    summary: {
      totalContracts: mockContracts.length,
      totalPayments: mockPayments.length,
      activeMilestones: mockMilestones.filter(m => m.status.includes("✅")).length,
      ...simulation,
    },
  };
};
