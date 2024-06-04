import { Model, DataTypes, Identifier } from "sequelize";
import sequelize from "../database";
import User from "./User";
import Reaction from "./Reaction";
import Content from "./Content";

class Message extends Model {
  declare id?: string;
  declare userId: string;
  declare messageId?: string;
  declare content: Content[];
  declare createdAt?: Date;
  declare updatedAt?: Date;
  declare comments?: Message[];
  declare reactions?: Reaction[];
  declare threadId?: string;
}

Message.init(
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
      allowNull: true,
      references: {
        model: Message,
        key: "id",
      },
    },
    threadId: {
      type: DataTypes.UUID,
      allowNull: true,
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
    tableName: "messages",
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

export default Message;
