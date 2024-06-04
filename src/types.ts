export type UserRole = "user" | "admin";
export type GameName = "tetris" | "snake";

interface BaseGameState {
  level: number;
  score: number;
  lives: number;
}

interface FilledCellsByRow {
  [row: number]: string; // value is the indexes of the only filled cells: "0,1,2,6,7,9"
}

interface TetrisGameState extends BaseGameState {
  grid: FilledCellsByRow;
  currentShape: FilledCellsByRow;
  nextShape: FilledCellsByRow;
}

interface SnakeGameState extends BaseGameState {
  snake: FilledCellsByRow;
  head: FilledCellsByRow;
  food: FilledCellsByRow;
}

export type GameState = TetrisGameState | SnakeGameState;

export type ContentType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "file"
  | "location"
  | "code"
  | "contact"
  | "pdf"
  | "link";

export type ReactionType = "like" | "love" | "dislike";
