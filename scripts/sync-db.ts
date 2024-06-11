import dotenv from "dotenv";
import mysql from "mysql2/promise";
import sequelize from "../src/utils/database";
import {
  User,
  Game,
  Message,
  Content,
  Reaction,
  UserFriends,
  Auth,
} from "../src/models";
dotenv.config();

console.log("process.env.DB_NAME", process.env.DB_NAME);
const dbName = process.env.DB_NAME!;
const user = process.env.DB_USERNAME!;
const password = process.env.DB_PASSWORD!;
const host = process.env.DB_HOST!;
const port = parseInt(process.env.DB_PORT!);

const syncDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    connection.end();
    console.log("Database created");
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    User;
    Auth;
    Game;
    Message;
    Content;
    Reaction;
    UserFriends;

    await sequelize.sync({ force: true }); // This will drop tables and re-create them
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the dbName:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
