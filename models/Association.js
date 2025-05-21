import db from "../config/Database.js";
import User from "./User.js";
import Avatar from "./Avatar.js";
import Background from "./Background.js";
import ChatHistory from "./ChatHistory.js";

User.hasMany(Avatar, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Avatar.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Background, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
})

Background.belongsTo(User, {
  foreignKey: "user_id",  
})


User.hasMany(ChatHistory, { 
  foreignKey: 'user_id' ,
  onDelete: "CASCADE",
});
ChatHistory.belongsTo(User, { 
  foreignKey: 'user_id' 
});

db.sync({ alter: true })
export { User, Avatar };