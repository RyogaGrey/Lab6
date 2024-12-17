import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // URL сервиса из задания №5

export const getNodes = async () => {
  const response = await axios.get(`${API_BASE_URL}/nodes`);
  return response.data;
};

export const getNodeDetails = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/nodes/${id}`);
  return response.data;
};
