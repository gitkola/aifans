import User from "./User";
import UserFriends from "./UserFriends";
import Game from "./Game";
import Message from "./Message";
import Content from "./Content";
import Reaction from "./Reaction";
import Auth from "./Auth";

User.hasOne(Auth, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.belongsToMany(User, {
  through: UserFriends,
  as: "Friends",
  foreignKey: "userId",
  otherKey: "friendId",
  onDelete: "CASCADE",
});
User.hasMany(Game, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(Message, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(Reaction, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
User.hasMany(Content, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
Auth.belongsTo(User, { foreignKey: "userId" });
Message.hasMany(Message, {
  foreignKey: "messageId",
  as: "Comments",
  onDelete: "CASCADE",
});
Message.hasMany(Reaction, {
  foreignKey: "messageId",
  onDelete: "CASCADE",
});
Message.hasMany(Content, {
  foreignKey: "messageId",
  onDelete: "CASCADE",
});
Game.belongsTo(User, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });
Message.belongsTo(Message, { foreignKey: "messageId" });
Reaction.belongsTo(User, { foreignKey: "userId" });
Reaction.belongsTo(Message, { foreignKey: "messageId" });
Content.belongsTo(User, { foreignKey: "userId" });
Content.belongsTo(Message, { foreignKey: "messageId" });

export interface UserWithAuth extends User {
  Auth: Auth;
}

export { User, Auth, Game, Message, Content, Reaction, UserFriends };
