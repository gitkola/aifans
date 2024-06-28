import { Model, DataTypes, Optional, Identifier } from "sequelize";
import { sequelize } from "../database";
import User from "./user";
import { GameName, GameState } from "../../types";

interface GameAttributes {
  id: string;
  name: GameName;
  userId: string;
  state?: GameState;
  createdAt?: Date;
  updatedAt?: Date;
}

interface GameCreationAttributes
  extends Optional<
    GameAttributes,
    "id" | "state" | "createdAt" | "updatedAt"
  > {}

class Game
  extends Model<GameAttributes, GameCreationAttributes>
  implements GameAttributes
{
  public id!: string;
  public name!: GameName;
  public userId!: string;
  public state?: GameState;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("tetris", "snake"),
      allowNull: false,
      defaultValue: "tetris",
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },
    state: {
      type: DataTypes.JSON,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Game",
    tableName: "games",
    timestamps: true,
    validate: {
      validateUserIdExists() {
        if (this.userId) {
          User.findByPk(this.userId as Identifier).then((user) => {
            if (!user) {
              throw new Error("User not found");
            }
          });
        }
      },
    },
  }
);

User.hasMany(Game, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Game.belongsTo(User, { foreignKey: "userId" });

export default Game;
