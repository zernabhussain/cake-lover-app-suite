import axios from "axios";
import { CakeBase } from "../common/types";
const API_BASE = process.env.REACT_APP_API_URL;

export const getCakes = async () => axios.get(`${API_BASE}/cakes`);

export const getCake = async (id: string) =>
  axios.get(`${API_BASE}/cakes/${id}`);

export const createCake = async (cake: CakeBase) =>
  axios.post(`${API_BASE}/cakes`, cake);

export const updateCake = async (id: string, cake: CakeBase) =>
  axios.put(`${API_BASE}/cakes/${id}`, cake);

export const deleteCake = async (id: string) =>
  axios.delete(`${API_BASE}/cakes/${id}`);
