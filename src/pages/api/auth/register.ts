// src/pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User, Auth } from "@/models";
import sequelize from "@/database";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const result = await sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          username,
          email: email || null,
        },
        { transaction: t }
      );
      await Auth.create(
        {
          userId: user.id,
          password: hashedPassword,
          salt: salt,
        },
        { transaction: t }
      );

      return user;
    });

    res.status(200).json({ message: "Registration successful", user: result });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
