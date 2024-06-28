import { NextApiRequest, NextApiResponse } from "next";
import Game from "@/db/models/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { userId, gameState } = req.body;

  if (!userId || !gameState) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const [game, created] = await Game.findOrCreate({
      where: { userId, name: "tetris" },
      // defaults: { state: gameState },
    });

    if (!created) {
      game.state = gameState;
      await game.save();
    }

    res.status(200).json({ message: "Game state saved successfully" });
  } catch (error) {
    console.error("Error saving game state:", error);
    res.status(500).json({ message: "Error saving game state" });
  }
}
