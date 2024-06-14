// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "@/db/models";
import { Op } from "sequelize";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    if (!req.body || !req.body.usernameOrEmail || !req.body.password) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const { usernameOrEmail, password } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user?.password || ""
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
          id: user.id,
        },
      });
    }
    return res.status(400).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
