import { DataTypes } from "sequelize";
import db from "../config/Database.js";

const Background = db.define("Background", {
  background_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  image_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Background;
