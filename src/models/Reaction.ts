import { Model, DataTypes, Identifier } from "sequelize";
import sequelize from "../utils/database";
import User from "./User";
import Message from "./Message";
import type { ReactionType } from "../types";

class Reaction extends Model {
  declare id?: string;
  declare userId: string;
  declare messageId: string;
  declare type: ReactionType;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Reaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    messageId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Message,
        key: "id",
      },
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    type: {
      type: DataTypes.ENUM("like", "love", "dislike"),
      allowNull: false,
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
    tableName: "reactions",
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
      validateMessageIdExists() {
        if (this.messageId) {
          Message.findByPk(this.messageId as Identifier).then((message) => {
            if (!message) {
              throw new Error("Message not found");
            }
          });
        }
      },
    },
  }
);

export default Reaction;
