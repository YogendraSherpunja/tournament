import axios from "axios";
import API_CONFIG from "../constants/api.config";

import { errorHandler } from "./errors";

const http = () => {
  return axios.create({
    baseURL: API_CONFIG.API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTournaments = async () => {
  const res = await http().get(`/tournaments`).catch(errorHandler);
  return res?.data || [];
};

export const postTournament = async (data) => {
  const res = await http()
    .post(`/tournaments`, { ...data })
    .catch(errorHandler);
  return res;
};

export const patchTouranment = async (id, data) => {
  const res = await http()
    .patch(`/tournaments/${id}`, data)
    .catch(errorHandler);
  return res;
};

export const deleteTouranment = async (id) => {
  const res = await http().delete(`/tournaments/${id}`).catch(errorHandler);
  return res;
};
