import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Avatar = db.define("Avatar", {
  avatar_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  model_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  chat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Avatar;
