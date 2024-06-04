import { Model, DataTypes, Identifier } from "sequelize";
import sequelize from "../database";
import Message from "./Message";
import User from "./User";
import { ContentType } from "../types";

class Content extends Model {
  declare id?: string;
  declare messageId: string;
  declare userId: string;
  declare type: ContentType;
  declare title?: string;
  declare source?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

Content.init(
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
      type: DataTypes.ENUM(
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
    title: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "content",
    timestamps: true,
    validate: {
      atLeastOneField() {
        if (!this.title && !this.source) {
          throw new Error("At least one of title or source must be defined.");
        }
      },
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

export default Content;
