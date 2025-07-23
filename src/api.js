// src/api.js
import axios from "axios";

const API_BASE_URL = "https://harambeecore-cloud-1.onrender.com";

// Data fetching endpoints
export const fetchContracts = () => axios.get(`${API_BASE_URL}/contracts`);
export const fetchMilestones = () => axios.get(`${API_BASE_URL}/milestones`);
export const runSimulation = (mode = "historic") =>
  axios.get(`${API_BASE_URL}/run?mode=${mode}`);
