"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE users (
      id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
      username VARCHAR(128) UNIQUE,
      email VARCHAR(128) NOT NULL UNIQUE,
      password VARCHAR(128) NOT NULL,
      role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
      avatar VARCHAR(255),
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE IF EXISTS users;`;
    await queryInterface.sequelize.query(statement);
  },
};
