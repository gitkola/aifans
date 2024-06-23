import { Model, DataTypes, Optional, Identifier } from "sequelize";
import { sequelize } from "../database";
import Message from "./message";
import User from "./user";
import { ContentType } from "../../types";

export interface ContentAttributes {
  id?: string;
  messageId: string;
  userId: string;
  type: ContentType;
  source?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContentCreationAttributes
  extends Optional<
    ContentAttributes,
    "id" | "source" | "createdAt" | "updatedAt"
  > {}

class Content
  extends Model<ContentAttributes, ContentCreationAttributes>
  implements ContentAttributes
{
  public id?: string;
  public messageId!: string;
  public userId!: string;
  public type!: ContentType;
  public source?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
}

Content.init(
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
      type: DataTypes.ENUM(
        "title",
        "text",
        "image",
        "video",
        "audio",
        "file",
        "location",
        "code",
        "contact",
        "pdf",
        "link"
      ),
      allowNull: false,
    },
    source: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Content",
    tableName: "content",
    timestamps: true,
    validate: {
      atLeastOneField() {
        if (!this.title && !this.source) {
          throw new Error("At least one of title or source must be defined.");
        }
      },
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

User.hasMany(Content, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Message.hasMany(Content, {
  foreignKey: "messageId",
  onDelete: "CASCADE",
});
Content.belongsTo(User, { foreignKey: "userId" });
Content.belongsTo(Message, { foreignKey: "messageId" });

export default Content;
