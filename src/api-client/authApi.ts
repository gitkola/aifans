// src/api-client/authApi.ts

import axios from "axios";

const API_URL = "/api/auth/";

export const registerApi = async ({
  password,
  email,
  username,
}: {
  password: string;
  email?: string;
  username?: string;
}) => {
  if (!email && !username) throw new Error("Email or username required");
  const response = await axios.post(API_URL + "register", {
    username,
    password,
    email,
  });
  return response.data;
};

export const loginApi = async ({
  usernameOrEmail,
  password,
}: {
  usernameOrEmail: string;
  password: string;
}) => {
  if (!usernameOrEmail) throw new Error("Email or username required");
  const response = await axios.post(API_URL + "login", {
    usernameOrEmail,
    password,
  });
  return response.data;
};

export const logoutApi = async () => {
  const response = await axios.post(API_URL + "logout");
  return response.data;
};
