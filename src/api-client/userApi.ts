// src/api/userApi.ts

import axios from "axios";

const API_URL = "/api/profile/";

export const fetchUserProfile = async () => {
  // TODO: add api handler
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateUserProfile = async (profileData: any) => {
  // TODO: add api handler, type profileData
  const response = await axios.put(API_URL, profileData);
  return response.data;
};

export const changePassword = async (passwordData: any) => {
  // TODO: add api handler, type passwordData
  const response = await axios.put(API_URL + "change-password", passwordData);
  return response.data;
};
