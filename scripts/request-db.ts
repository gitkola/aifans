import { log } from "console";
import sequelize from "../src/utils/database";
import { User, Game, Message, Content, Reaction } from "../src/models";

const requestDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const users = await User.findAll({
      where: { role: "admin" },
      include: ["Friends", Game, Message, Content, Reaction],
    });

    log(users.map((user) => JSON.stringify(user, null, 2)));

    // const messages = await Message.findAll({
    //   include: [Content, "Comments", Reaction],
    // });
    // log(messages.map((message) => JSON.stringify(message, null, 2)));

    // const games = await Game.findAll();
    // log(games.map((game) => JSON.stringify(game, null, 2)));

    // await User.destroy({
    //   where: { id: "1f92f824-0f34-4bd6-9b9d-718b54899d09" },
    // });

    // await Message.destroy({
    //   where: { id: "ef11ed08-9b66-4b47-9ca3-bf73ef90a23e" },
    // });

    console.log("Database respond successfully.");
  } catch (error) {
    console.error("Something went wrong while requesting database:", error);
  } finally {
    await sequelize.close();
  }
};

requestDatabase();
