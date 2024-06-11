import { log } from "console";
import sequelize from "../src/utils/database";
import {
  User,
  Game,
  Message,
  Content,
  Reaction,
  UserFriends,
} from "../src/models";

const fillDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    // Fill the database with data
    // Create users
    const users = [];
    for (let i = 0; i < 16; i++) {
      const username = generateRandomUsername(i);
      const user = await User.create({
        username,
        email: generateRandomEmail(username),
        avatar: i % 4 != 0 ? generateRandomAvatar() : null,
        role: i % 8 === 0 ? "admin" : "user",
      });
      users.push(user);
    }
    // Create friendships
    const friendships = [];
    for (let n = 0; n < 2; n++) {
      for (let i = 0; i < users.length; i++) {
        let x = Math.abs(
          Math.round((Math.random() * 1000 - i * i) % (users.length - 1))
        );
        if (users[i].id === users[x].id) {
          x = users.length - x;
        }
        if (users[i].id === users[x].id) {
          continue;
        }
        const friendship = await UserFriends.create({
          userId: users[i].id,
          friendId: users[x].id,
        });
        friendships.push(friendship);
      }
    }
    // Create games
    const games = [];
    for (let i = 0; i < users.length; i++) {
      if (i % 6 === 0) continue;
      let name = i % 3 !== 0 ? "tetris" : "snake";
      const game = await Game.create({
        name,
        userId: users[i].id,
      });
      games.push(game);
    }
    // Create messages
    const messages = [];
    for (let n = 0; n < 3; n++) {
      for (let i = 0; i < users.length; i++) {
        if (i % 8 === 0) continue;
        const message = (await Message.create({
          userId: users[i].id,
          messageId: messages.length > 2 && i > 2 ? messages[i - 2]?.id : null,
        })) as Message;
        for (let j = 0; j < (i % 3 === 0 ? 5 : 3); j++) {
          Content.create(getRandomContent(message.userId, message.id!));
        }
        messages.push(message);
      }
    }
    // Create reactions
    const reactions = [];
    for (let i = 0; i < messages.length; i++) {
      if (i % 5 === 0) continue;
      const reaction = await Reaction.create({
        type: getRandomReactionType(),
        userId: users[i % (users.length - 1)].id,
        messageId: messages[i].id,
      });
      reactions.push(reaction);
    }

    console.log("Database filled successfully.");
  } catch (error) {
    console.error(
      "Something went wrong while filling database:",
      (error as Error).message
    );
  } finally {
    await sequelize.close();
  }
};

function generateRandomUsername(i: number = 0) {
  const adjectives = [
    "Adorable",
    "Beautiful",
    "Clean",
    "Drab",
    "Elegant",
    "Fancy",
    "Glamorous",
    "Handsome",
    "Long",
    "Magnificent",
    "Old-fashioned",
    "Plain",
    "Quaint",
    "Sparkling",
    "Ugliest",
    "Wide-eyed",
  ];
  const nouns = [
    "Puppy",
    "Kitten",
    "Dog",
    "Cat",
    "Fish",
    "Lion",
    "Tiger",
    "Bear",
    "Wolf",
    "Fox",
    "Rabbit",
    "Horse",
    "Deer",
    "Elephant",
    "Giraffe",
    "Zebra",
  ];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const username = i % 2 ? `${adjective} ${noun}` : `${noun} ${adjective}`;
  return username;
}

function generateRandomEmail(username: string = "") {
  const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${username.replace(" ", "").toLowerCase()}@${domain}`;
}

function getRandomContent(userId: string, messageId: string) {
  if (!userId || !messageId) {
    throw new Error("userId and messageId must be defined");
  }

  const types = ["text", "image", "video"];
  const type = types[Math.floor(Math.random() * types.length)];
  const content = {
    userId,
    messageId,
    type,
  };
  switch (type) {
    case "text":
      return { ...content, source: `Hello ${generateRandomUsername()}` };
    case "image":
      return {
        ...content,
        source: `https://picsum.photos/200/300?random=${Math.floor(
          Math.random() * 1000
        )}`,
      };
    case "video":
      return {
        ...content,
        source: `https://www.youtube.com/watch?v=${Math.random()
          .toString(36)
          .substring(7)}`,
      };
  }
}

function getRandomReactionType() {
  const types = ["like", "love", "dislike"];
  return types[Math.floor(Math.random() * types.length)];
}

function generateRandomAvatar() {
  return `https://api.dicebear.com/8.x/bottts/svg`;
}

fillDatabase();
