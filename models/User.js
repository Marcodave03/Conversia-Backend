import {DataTypes} from 'sequelize';
import db from '../config/Database.js';

const User = db.define('User',{
    user_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    sui_id:{
        type:DataTypes.STRING,
        allowNull:false
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
});

export default User;