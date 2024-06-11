// src/pages/api/auth/login.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simply return a success response for now
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
