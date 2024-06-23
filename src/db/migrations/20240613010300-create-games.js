"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const statement = `CREATE TABLE games (
      id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
      name ENUM('tetris', 'shake') NOT NULL DEFAULT 'tetris',
      userId CHAR(36) NOT NULL,
      state JSON,
      createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;`;
    await queryInterface.sequelize.query(statement);
  },
  async down(queryInterface) {
    const statement = `DROP TABLE IF EXISTS games;`;
    await queryInterface.sequelize.query(statement);
  },
};
