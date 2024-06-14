import { Model, DataTypes, Optional, Identifier } from "sequelize";
import { sequelize } from "../database";
import User from "./user";
import Message from "./message";
import type { ReactionType } from "../../types";

export interface ReactionAttributes {
  id?: string;
  messageId: string;
  userId: string;
  type: ReactionType;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ReactionCreationAttributes
  extends Optional<ReactionAttributes, "id" | "createdAt" | "updatedAt"> {}

class Reaction
  extends Model<ReactionAttributes, ReactionCreationAttributes>
  implements ReactionAttributes
{
  public id?: string;
  public messageId!: string;
  public userId!: string;
  public type!: ReactionType;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Reaction.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    messageId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: "messages",
        key: "id",
      },
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    type: {
      type: DataTypes.ENUM("like", "dislike", "love", "laugh", "sad", "angry"),
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
    modelName: "Reaction",
    tableName: "reactions",
    timestamps: true,
    validate: {
      async validateUserIdExists() {
        const user = await User.findByPk(this.userId as Identifier);
        if (!user) {
          throw new Error("User not found");
        }
      },
      async validateMessageIdExists() {
        const message = await Message.findByPk(this.messageId as Identifier);
        if (!message) {
          throw new Error("Message not found");
        }
      },
    },
  }
);

User.hasMany(Reaction, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Message.hasMany(Reaction, {
  foreignKey: "messageId",
  onDelete: "CASCADE",
});
Reaction.belongsTo(User, { foreignKey: "userId" });
Reaction.belongsTo(Message, { foreignKey: "messageId" });

export default Reaction;
