import { Model, DataTypes, Identifier } from "sequelize";
import sequelize from "../utils/database";
import User from "./User";

class UserFriends extends Model {
  declare userId: string;
  declare friendId: string;
  declare approved?: boolean;
  declare threadId?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

UserFriends.init(
  {
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
    friendId: {
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
    approved: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    threadId: {
      type: DataTypes.UUID,
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
    tableName: "user_friends",
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
      validateFriendIdExists() {
        if (this.friendId) {
          User.findByPk(this.friendId as Identifier).then((friend) => {
            if (!friend) {
              throw new Error("Friend not found");
            }
          });
        }
      },
      validateUserIdNotEqualFriendId() {
        if (this.userId === this.friendId) {
          throw new Error("User and Friend must be different");
        }
      },
    },
  }
);

export default UserFriends;
