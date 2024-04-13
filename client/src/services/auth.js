import axios from "axios";

import config from "../constants/api.config";

export const login = async (data) => {
  const res = await axios.post(`${config.API_URL}/users/login`, data);
  await Promise.all([
    localStorage.setItem("token", res.data.token),
    localStorage.setItem("user", JSON.stringify(data)),
  ]);
};

export const register = async (data) => {
  await axios.post(`${config.API_URL}/users/register`, data);
};

export const logout = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
