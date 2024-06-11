// src/api-client/authApi.ts

import axios from "axios";

const API_URL = "/api/auth/";

export const registerApi = async (
  username: string,
  password: string,
  email?: string
) => {
  const response = await axios.post(API_URL + "register", {
    username,
    password,
    email,
  });
  return response.data;
};

export const loginApi = async (username: string, password: string) => {
  const response = await axios.post(API_URL + "login", { username, password });
  return response.data;
};

export const logoutApi = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data;
};
