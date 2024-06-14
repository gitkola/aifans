import { Model, DataTypes, Optional, Identifier } from "sequelize";
import { sequelize } from "../database";
import User from "./user";
import type { ContentAttributes } from "./content";
import type { ReactionAttributes } from "./reaction";

interface MessageAttributes {
  id?: string;
  userId: string;
  messageId?: string;
  content?: ContentAttributes[];
  comments?: Message[];
  reactions?: ReactionAttributes[];
  threadId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes
{
  public id?: string;
  public userId!: string;
  public messageId?: string;
  public content?: ContentAttributes[];
  public comments?: Message[];
  public reactions?: ReactionAttributes[];
  public threadId?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

interface MessageCreationAttributes
  extends Optional<
    MessageAttributes,
    "id" | "messageId" | "reactions" | "createdAt" | "updatedAt" | "threadId"
  > {}

Message.init(
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
      allowNull: true,
      references: {
        model: "messages",
        key: "id",
      },
    },
    threadId: {
      type: DataTypes.STRING(36),
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
    modelName: "Message",
    tableName: "messages",
    timestamps: true,
    validate: {
      async validateUserIdExists() {
        const user = await User.findByPk(this.userId as Identifier);
        if (!user) {
          throw new Error("User not found");
        }
      },
    },
  }
);

User.hasMany(Message, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Message.belongsTo(User, { foreignKey: "userId" });
Message.belongsTo(Message, { foreignKey: "messageId" });

export default Message;
