// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User, Auth, UserWithAuth } from "@/models";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const { username, password } = req.body;

    const user = (await User.findOne({
      where: { username },
      include: [Auth], // TODO: add Auth fields to User model
    })) as UserWithAuth;

    const isValidPassword = await bcrypt.compare(
      password,
      user?.Auth?.password
    );
    if (isValidPassword) {
      // TODO: handle create session data
      return res.status(200).json({
        message: "Login successful",
        user: {
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          role: user.role,
        },
      });
    }
    return res.status(400).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
