import { Model, DataTypes, Identifier } from "sequelize";
import sequelize from "../utils/database";
import User from "./User";
import { GameName, GameState } from "../types";

class Game extends Model {
  declare id?: string;
  declare name: GameName;
  declare userId: string;
  declare state?: GameState;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Game.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.ENUM("tetris", "snake"),
      allowNull: false,
      validate: {
        isIn: [["tetris", "snake"]],
      },
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    state: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "games",
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

export default Game;
