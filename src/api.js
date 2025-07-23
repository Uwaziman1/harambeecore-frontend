import axios from "axios";

const API_BASE_URL = "https://harambeecore-cloud-1.onrender.com; //

export const fetchContracts = () => axios.get(`${API_BASE_URL}/contracts`);
export const fetchMilestones = () => axios.get(`${API_BASE_URL}/milestones`);
// Add more as needed
