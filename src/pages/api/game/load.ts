import { NextApiRequest, NextApiResponse } from "next";
import Game from "@/db/models/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId" });
  }

  try {
    const game = await Game.findOne({
      where: { userId, name: "tetris" },
    });

    if (!game || !game.state) {
      return res.status(404).json({ message: "No saved game state found" });
    }

    res.status(200).json({ gameState: game.state });
  } catch (error) {
    console.error("Error loading game state:", error);
    res.status(500).json({ message: "Error loading game state" });
  }
}
