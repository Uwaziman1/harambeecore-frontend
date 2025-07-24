// src/api.js

const BASE_URL = "https://harambeecore-cloud-1.onrender.com";

export const fetchAnalysis = async () => {
  try {
    const response = await fetch(`${BASE_URL}/analyze`);
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching analysis:", error);
    return null;
  }
};
