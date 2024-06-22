const API_URL = "/api/me/profile";

export const fetchUserProfile = async () => {
  // TODO: add api handler
  const response = await fetch(API_URL, {
    method: "GET",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const updateUserProfile = async (profileData: any) => {
  // TODO: add api handler, type profileData
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(profileData),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const changePassword = async (passwordData: any) => {
  // TODO: add api handler, type passwordData
  const response = await fetch(API_URL + "change-password", {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(passwordData),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
