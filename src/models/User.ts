import { Model, DataTypes } from "sequelize";
import sequelize from "../database";
import { UserRole } from "../types";

class User extends Model {
  declare id?: string;
  declare username: string;
  declare email: string;
  declare role: UserRole;
  declare avatar?: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
        len: [2, 128],
      },
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]],
      },
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
