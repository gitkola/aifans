import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const dbName = process.env.DB_NAME!;
const user = process.env.DB_USERNAME!;
const password = process.env.DB_PASSWORD!;
const host = process.env.DB_HOST!;
const port = parseInt(process.env.DB_PORT!);

const createDatabase = async () => {
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
  } catch (error) {
    console.error("Unable to connect to the dbName:", error);
  }
};

createDatabase();
