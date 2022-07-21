import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout service
const logout = () => localStorage.removeItem("user");

// login service
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  console.log(response.data)
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
