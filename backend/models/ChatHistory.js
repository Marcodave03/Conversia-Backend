import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const ChatHistory = db.define('ChatHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  model_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sender: {
    type: DataTypes.ENUM('user', 'system'),
    allowNull: false,
  },
});

export default ChatHistory;
