import { Model, DataTypes, Optional, Identifier } from "sequelize";
import { sequelize } from "../database";
import User from "./user";

interface UserFriendAttributes {
  id: string;
  userId: string;
  friendId: string;
  approved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserFriendCreationAttributes
  extends Optional<
    UserFriendAttributes,
    "id" | "approved" | "createdAt" | "updatedAt"
  > {}

class UserFriend
  extends Model<UserFriendAttributes, UserFriendCreationAttributes>
  implements UserFriendAttributes
{
  public id!: string;
  public userId!: string;
  public friendId!: string;
  public approved?: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserFriend.init(
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
      onDelete: "CASCADE",
    },
    friendId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    approved: {
      type: DataTypes.BOOLEAN,
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
    modelName: "UserFriend",
    tableName: "friends",
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

User.belongsToMany(User, {
  through: UserFriend,
  as: "User",
  foreignKey: "userId",
  otherKey: "friendId",
  onDelete: "CASCADE",
});
User.belongsToMany(User, {
  through: UserFriend,
  as: "Friend",
  foreignKey: "friendId",
  otherKey: "userId",
  onDelete: "CASCADE",
});

export default UserFriend;
