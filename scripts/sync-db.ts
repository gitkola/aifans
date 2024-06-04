import sequelize from "../src/database";
import {
  User,
  Game,
  Message,
  Content,
  Reaction,
  UserFriends,
} from "../src/models";

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    User;
    Game;
    Message;
    Content;
    Reaction;
    UserFriends;

    await sequelize.sync({ force: true }); // This will drop tables and re-create them
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await sequelize.close();
  }
};

syncDatabase();
