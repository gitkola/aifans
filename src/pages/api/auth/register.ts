// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "@/db/models";
import { Op } from "sequelize";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Invalid request" });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "Password required" });
    }
    if (!req.body.email && !req.body.username) {
      return res.status(400).json({ message: "Email or username required" });
    }
    const { username, email, password } = req.body;
    const existedUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (existedUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username || null,
      email: email || null,
      password: hashedPassword,
      role: "user",
    });

    res.status(200).json({ message: "Registration successful", user });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
