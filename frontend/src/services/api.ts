import axios from "axios";
import { getAccessToken } from "../utils/authStorage";

const AUTHORIZATION = "Authorization";

export const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 5000,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token === null) return config;
  const bearer = `Bearer ${token}`;

  config.headers.set(AUTHORIZATION, bearer);
  return config;
});
