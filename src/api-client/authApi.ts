const API_URL = "/api/auth/";

export const registerApi = async ({
  password,
  email,
  username,
}: {
  password: string;
  email: string;
  username?: string;
}) => {
  const response = await fetch(API_URL + "register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const loginApi = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const response = await fetch(API_URL + "login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};

export const logoutApi = async () => {
  const response = await fetch(API_URL + "logout", {
    method: "POST",
    headers: { "content-type": "application/json" },
  });
  if (!response.ok) throw new Error(response.statusText);
  return await response.json();
};
