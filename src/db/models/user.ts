import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database";
import { UserRole, IUser } from "../../types";

interface UserCreationAttributes
  extends Optional<
    IUser,
    "id" | "username" | "avatar" | "createdAt" | "updatedAt"
  > {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public username?: string;
  public email!: string;
  public password!: string;
  public role!: UserRole;
  public avatar?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
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
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;
