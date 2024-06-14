"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE friends (
      id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
      userId CHAR(36) NOT NULL,
      friendId CHAR(36) NOT NULL,
      approved BOOLEAN,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE,
      FOREIGN KEY (friendId) REFERENCES users (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE IF EXISTS friends;`;
    await queryInterface.sequelize.query(statement);
  },
};
