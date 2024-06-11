// src/api/userApi.ts

import axios from "axios";

const API_URL = "/api/profile/";

export const fetchUserProfile = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const updateUserProfile = async (profileData: any) => {
  const response = await axios.put(API_URL, profileData);
  return response.data;
};

export const changePassword = async (passwordData: any) => {
  const response = await axios.put(API_URL + "change-password", passwordData);
  return response.data;
};
