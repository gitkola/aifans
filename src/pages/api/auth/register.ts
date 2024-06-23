import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { User } from "@/db/models";
import { Op } from "sequelize";

export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).json({ message: "Invalid request." });
    }
    if (!req.body.password) {
      return res.status(400).json({ message: "Password required." });
    }
    if (!req.body.email) {
      return res.status(400).json({ message: "Email required." });
    }
    const { username, email, password } = req.body;
    const existedUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });
    if (existedUser) {
      return res
        .status(409)
        .json({ message: "User with this email or username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      username: username || null,
      email: email,
      password: hashedPassword,
      role: "user",
    });
    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    // TODO: handle email validation - 11@11.11 was valid on client, but throw an error: ValidationError [SequelizeValidationError]: Validation error: Validation isEmail on email failed
    res.status(500).json({ message: "Internal Server Error" });
  }
}
